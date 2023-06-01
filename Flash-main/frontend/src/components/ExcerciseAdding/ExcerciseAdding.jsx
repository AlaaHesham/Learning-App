const ExcerciseAdding = (props) => {

    return (
        <div className="create-course-tr">
            <button title="remove" onClick={() => props.removeExercise()} className="remove-subtitle">X</button>
            <label className="label1">Question </label> <br></br>
            <input type="text" placeholder="e.g., What is the color of the sky? " onChange={(e) => props.questionChanged(e.target.value)}
                value={props.excercise.question} />
            <br></br><br></br>
            <label className="label1">Choice A </label> <br></br>
            <input type="text" placeholder="e.g., Red" onChange={(e) => props.choiceAChanged(e.target.value)}
                value={props.excercise.choiceA} />
            <br></br><br></br>
            <label className="label1">Choice B </label> <br></br>
            <input type="text" placeholder="e.g., Blue" onChange={(e) => props.choiceBChanged(e.target.value)}
                value={props.excercise.choiceB} />
            <br></br><br></br>
            <label className="label1">Choice C  </label> <br></br>
            <input type="text" placeholder="e.g., Green" onChange={(e) => props.choiceCChanged(e.target.value)}
                value={props.excercise.choiceC} />
            <br></br><br></br>
            <label className="label1">Choice D  </label> <br></br>
            <input type="text" placeholder="e.g., I have no idea" onChange={(e) => props.choiceDChanged(e.target.value)}
                value={props.excercise.choiceD} />
            <br></br><br></br>
            <label className="label1">Answer </label> <br></br>
            <select style={{marginLeft:"0px"}} className="subjects-dropDownList" id="answer-dropdownlist" onChange={(e) => props.answerChanged(e.target.value)} name="answer">
                <option hidden value="">Select the correct answer</option>
                <option value={props.excercise.choiceA}>Choice A</option>
                <option value={props.excercise.choiceB}>Choice B</option>
                <option value={props.excercise.choiceC}>Choice C</option>
                <option value={props.excercise.choiceD}>Choice D</option>
            </select>
            {/* <input type="text" placeholder="e.g., Blue" onChange={(e) => props.answerChanged(e.target.value)}
                value={props.excercise.answer} /> */}

        </div>
    );
}

export default ExcerciseAdding