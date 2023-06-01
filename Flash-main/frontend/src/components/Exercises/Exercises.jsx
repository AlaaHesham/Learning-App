import React from 'react'
import axios from 'axios'
import {useState,useEffect} from 'react'
import './exercises.scss'

export default function Exercises({id}) {
    const [subtitle,setSubtitle]=useState()
    const [exercises,setExercises]=useState([])
    const [answer, setAnswer] = useState([])
    const [result, setResult] = useState([])
    const [checked,setChecked]=useState([])
    const [solved, setSolved] = useState(false)
    const [grade, setGrade] = useState(0)

    useEffect(() => {
        const get = async () => {
          const res = await axios.get('/subtitles/'+id+'/excercises');
          setSubtitle(res.data)
          setExercises(res.data.excercises)
        };
        get();
        let tmp=[]
        let tmp2=[]
        let tmp3=[]
        for(let i=0;i<exercises.length;i++){
          tmp[i]=''
          tmp2[i]=false
          tmp3[i]=''
        }
        setAnswer(tmp)
        setResult(tmp2)
        setChecked(tmp3)
        setSolved(false)
        setGrade(0)
      }, [id],[]);

      const solve=async(index,MyAnswer)=>{
        let tmp=[...answer]; tmp[index]=MyAnswer;
        setAnswer(tmp);
        if(exercises[index].answer===MyAnswer){
            let tmp=[...result]; tmp[index]=true;
            setGrade(grade+1);
            setResult(tmp);
        }
        else{
            let tmp=[...result]; tmp[index]=false;
            setResult(tmp);

        }
      }

      const submitAnswers=async()=>{
        setSolved(true)
        const res=await axios.post('/user/update-progress',{
            course:subtitle.course,
            subtitle:id,
            type:"exercise"
        })
        
        console.log(answer)
        console.log(result)
      }

  return (
    <div className="allexcercises">
          <h2>Exercises</h2> 


          {
          <div className="excercises">

            {exercises &&exercises.map((exercise,index) => (
                <div className="exercise">

                <form className="ex"  id="my_form" >
                <label className='q'>{exercise.question}</label><br></br>
                <div className='choice'>
                <input disabled={solved} checked={checked[index]==='a'?true:false} type="radio" name="r" id="a" value={exercise.choiceA}  onChange={(e) => {solve(exercises.indexOf(exercise),e.target.value);setSolved(false);let tmp=[...checked];tmp[index]='a';setChecked(tmp)}} ></input>
                <label className=''  htmlFor={exercise.choiceA} >{exercise.choiceA}</label>
                 <br></br>
                </div>
                <div className='choice'>
                <input disabled={solved}  checked={checked[index]==='b'?true:false}type="radio" name="r" id="b" value={exercise.choiceB}  onChange={(e) => {solve(exercises.indexOf(exercise),e.target.value);setSolved(false);let tmp=[...checked];tmp[index]='b';setChecked(tmp)}}></input>
                <label className='' htmlFor={exercise.choiceB}>{exercise.choiceB}</label><br></br>
                </div>
                <div className='choice'>
                <input disabled={solved} checked={checked[index]==='c'?true:false} type="radio"  name="r" id="c" value={exercise.choiceC}   onChange={(e) => {solve(exercises.indexOf(exercise),e.target.value);setSolved(false);let tmp=[...checked];tmp[index]='c';setChecked(tmp)}}></input>
                <label className='' htmlFor={exercise.choiceC}>{exercise.choiceC}</label><br></br>
                </div>
                <div className='choice'>
                <input disabled={solved} checked={checked[index]==='d'?true:false} type="radio"  name="r" id="d" value={exercise.choiceD}   onChange={(e) => {solve(exercises.indexOf(exercise),e.target.value);setSolved(false);let tmp=[...checked];tmp[index]='d';setChecked(tmp)}}></input>
                <label className='' htmlFor={exercise.choiceD}>{exercise.choiceD}</label><br></br>
                </div>
                <div className='result'>
                {(solved&&result[exercises.indexOf(exercise)])&&<span style={{backgroundColor:"green"}}>1/1</span>}
                {(solved&&!result[exercises.indexOf(exercise)])&&<span style={{backgroundColor:"#d55b5c"}}>0/1 <b>Nope, correct answer: </b>{exercise.answer}</span>}
                </div>
                </form>
    
            </div>
              
            ))}
          </div>}

           <button className="exsend" disabled={solved} onClick={submitAnswers}>Send</button>
           {solved&&<h7 style={{fontSize:"17px",marginLeft:"850px",marginTop:"40px",color:"#8996d3"}}>Your grade is: <b>{grade}/{exercises.length}</b></h7>}


        </div>
      )
}
