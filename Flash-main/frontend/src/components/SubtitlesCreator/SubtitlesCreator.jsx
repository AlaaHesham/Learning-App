const Subtitle = (props) => {

    return (
        <div className="create-course-tr">
                        <button title="remove" onClick={() => props.removeSubtitle()} className="remove-subtitle">X</button>

            <label className="label1">Subtitle</label>
            <input
                type='text'
                placeholder="Enter subtitle name"
                onChange={(e) => props.subtitleNameChanged(e.target.value)}
                value={props.subtitle.subtitle}
            /><br></br>
        </div>
    );
}

export default Subtitle