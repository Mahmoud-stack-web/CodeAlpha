import { useState, useEffect } from "react";
import "./Quote.css";

const quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    author: "Will Rogers",
  },
  {
    text: "It’s not whether you get knocked down, it’s whether you get up.",
    author: "Vince Lombardi",
  },
  {
    text: "If you are working on something exciting, it will keep you motivated.",
    author: "Steve Jobs",
  },
  {
    text: "Success is not in what you have, but who you are.",
    author: "Bo Bennett",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "Your time is limited, don’t waste it living someone else’s life.",
    author: "Steve Jobs",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
];

function Quote() {
  const [quote, setQuote] = useState({ text: "", author: "" });

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="app">
      <div className="quote-box">
        <p id="quote">"{quote.text}"</p>
        <h4 id="author">— {quote.author}</h4>
        <button id="new-quote" onClick={getRandomQuote}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default Quote;
