import Flashcard from "./Flashcard";

function FlashcardContainer({word, definition}){
    return(
        <div id="flashcard-container">
          <div className="flashcard-box">
            <Flashcard type="word" text={word} />
            <Flashcard type="definition" text={definition} />
          </div>
        </div>
    )
}
export default FlashcardContainer;