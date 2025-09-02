import { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = () => {
  const storedCards = JSON.parse(localStorage.getItem("flashcards")) || [
    {
      id: 1,
      question: "What is React?",
      answer: "A JavaScript library for building UIs.",
    },
    {
      id: 2,
      question: "What is JSX?",
      answer: "A syntax extension for JavaScript that looks like HTML.",
    },
    {
      id: 3,
      question: "What is useState?",
      answer: "A React hook for managing component state.",
    },
  ];

  const [flashcards, setFlashcards] = useState(storedCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
  }, [flashcards]);

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const handleAddOrEdit = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    if (editingId) {
      setFlashcards((prev) =>
        prev.map((card) =>
          card.id === editingId
            ? { ...card, question: newQuestion, answer: newAnswer }
            : card
        )
      );
      setEditingId(null);
    } else {
      const newCard = {
        id: Date.now(),
        question: newQuestion,
        answer: newAnswer,
      };
      setFlashcards([...flashcards, newCard]);
    }

    setNewQuestion("");
    setNewAnswer("");
  };

  const handleDelete = (id) => {
    setFlashcards((prev) => {
      const updated = prev.filter((card) => card.id !== id);
      if (updated.length === 0) {
        setCurrentIndex(0);
        setFlipped(false);
        return [];
      }
      if (currentIndex >= updated.length) setCurrentIndex(updated.length - 1);
      setFlipped(false);
      return updated;
    });
  };

  const handleEdit = (card) => {
    setNewQuestion(card.question);
    setNewAnswer(card.answer);
    setEditingId(card.id);
  };

  return (
    <div className="container">
      <h1>Flashcard Quiz App</h1>
      <hr />

      {flashcards.length > 0 && (
        <div className="card-wrapper">
          <div className="card-container">
            <div className={`card ${flipped ? "flipped" : ""}`}>
              <div className="card-front">
                <h2>{flashcards[currentIndex].question}</h2>
              </div>
              <div className="card-back">
                <p>{flashcards[currentIndex].answer}</p>
              </div>
            </div>
          </div>

          <div className="flip-btn">
            <button onClick={() => setFlipped(!flipped)}>
              {flipped ? "Hide Answer" : "Show Answer"}
            </button>
          </div>

          <div className="navigation">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>

          <div className="actions">
            <button onClick={() => handleEdit(flashcards[currentIndex])}>
              Edit
            </button>
            <button onClick={() => handleDelete(flashcards[currentIndex].id)}>
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="form">
        <h3>{editingId ? "Edit Flashcard" : "Add New Flashcard"}</h3>
        <input
          type="text"
          placeholder="Enter question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter answer"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
        <button onClick={handleAddOrEdit}>
          {editingId ? "Update Card" : "Add Card"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setNewQuestion("");
              setNewAnswer("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
