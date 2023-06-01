import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import Request from "../../components/Request/Request";
const ViewWallet = () => {
    const [wallet, setWallet] = useState(0)
    const [currency, setCurrency] = useState(null)
    const [adjustedWallet, setAdjustedWallet] = useState(null)
    const [requests, setRequests] = useState([])

    const params = useParams();
    const id = params.id
    
    useEffect(() => {
        const fetchIndividualTrainee = async () => {
            const response = await fetch('/individualTrainees/requestRefund/' + id)
            const json = await response.json()

            if (response.ok) {
                setRequests(json)
            }
        }

        fetchIndividualTrainee()
    }, [])

    useEffect(() => {
        const fetchIndividualTrainee = async () => {
            const response = await fetch('/individualTrainees/' + id)
            const json = await response.json()

            if (response.ok) {
                setWallet(json.wallet)
            }
        }

        fetchIndividualTrainee()
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

        const getAdjustedWallet = async () => {

            const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0')
            const json = await response.json()//returns a json object with an array of all exchange rates with USD as base

            const rate = json.rates[currency]


            if (response.ok) {
                setAdjustedWallet(rate * wallet)
            }
        }

        getAdjustedWallet()
    })
    return (
        <div>
            <div className="wallet">
                <h1>Refunding requests</h1>
                <p><img src="https://img.icons8.com/ios-glyphs/30/null/money-bag.png"/> Your Credit : {adjustedWallet} {currency}</p>
            </div>

            <div className="refund-requests-trainee" style={{marginLeft:"-28%"}}>
                {requests.map(request => {
                    return (
                        <div key={request}>
                            <Request request={request} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default ViewWallet