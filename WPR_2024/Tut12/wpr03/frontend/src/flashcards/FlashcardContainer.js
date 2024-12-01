import Flashcard from "./Flashcard";

export default function FlashcardContainer({ word, def }) {
    return (
        <div>
            <Flashcard type="word" text={word} />
            <Flashcard type="definition" text={def} />
        </div>
    );
}