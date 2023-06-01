import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout"
const RegisterForCourse = (props) => {
    const [price, setPrice] = useState(0)
    const [wallet, setWallet] = useState(0)
    const [currency, setCurrency] = useState(null)
    const [adjustedPrice, setAdjustedPrice] = useState(null)
    const [email, setEmail] = useState("")
    const [error,setError]=useState(null)
    const id = props.id
    const courseId = props.courseId
    useEffect(() => {
        const fetchIndividualTrainee = async () => {
            const response = await fetch('/individualTrainees/' + id)
            const json = await response.json()

            if (response.ok) {
                setWallet(json.wallet)
                setEmail(json.email)
                console.log(email)
            }
        }

        fetchIndividualTrainee()
    }, [])
    
    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch('/courses/' + courseId)
            const response2 = await fetch ('/courses/'+courseId+'/discount')
            const json = await response.json()
            const json2 = await response2.json()
            if (response.ok) {
                    setPrice((json.price)*(1- (json2.discount)/100)) 
            }
        }

        fetchCourse()
    }, [])
    useEffect(() => {
        const fetchCurrency = async () => {
            const response = await fetch('/login/currency')
            const json = await response.json()


            if (response.ok) {
                setCurrency(json)
            }
        }

        fetchCurrency()

    }, [])
    useEffect(() => {

        const getAdjustedPrice = async () => {

            const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0');
            const json = await response.json()//returns a json object with an array of all exchange rates with USD as base

            const rate = json.rates[currency]


            if (response.ok) {
                setAdjustedPrice(rate * price)
            }
        }

        getAdjustedPrice()
    })
    const addCourse = async ()=>{
        const entry = { courseId}
        const response = await fetch('/individualTrainees/' + id, {
            method: 'PATCH',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setError(null)
            props.setter()
        }
    }

    const onToken = async (token) => {
        const entry = { courseId, price,wallet,token}
        const response = await fetch('/individualTrainees/register/' + id+'/pay', {
            method: 'POST',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(response)
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            addCourse()
            setError(null)
        }
        
      }
    return (
        <div className="register-for-course" style={{cursor:"pointer"}}>
            <StripeCheckout
            email= {email}
            name="Payment"
            description="Course Payment"
            amount={adjustedPrice*100}
            currency={currency? currency:"USD"}
            token={onToken}
            stripeKey='pk_test_51MEakIBldv5L7zd6VIwU8t8Ss5p8oj0gX0gkNbEXdSa5QfdRY4U8Yu4R0qFVjz9FlHBfaBqe8Ljbc5xzzFqXgmaa00bFSEVehl'
            >
                <button style={{cursor:"pointer",marginTop:"30px",borderRadius:"10px",border:0,fontSize:"20px",backgroundColor:"#fa7466",color:"white"}}>Register Now!</button>
            </StripeCheckout>
            {error && <p>{error}</p>}

        </div>
    )
}

export default RegisterForCourse