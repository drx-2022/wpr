function Flashcard({type, text}){
    return(
        <div className={"flashcard "+ type}>{text}</div>
    )
}
export default Flashcard;