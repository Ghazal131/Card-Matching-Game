import { useState, useEffect } from "react";
import "./App.css";

const cardImages = [
  { id: 1, name: "🍎"},
  { id: 2, name: "🍌"},
  { id: 3, name: "🍇"},
  { id: 4, name: "🍉"},
  { id: 5, name: "🍓"},
  { id: 6, name: "🍒"},
];

function shuffleCards() {
  const shuffled = [...cardImages, ...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card, index) => ({...card, id: index, matched: false}));
  return shuffled;
}

function App() {
  const [cards, setCards] = useState(shuffleCards());
  const [selectedCards, setSelectedCards] = useState([]);
  const[disabled, setDisabled] = useState(false);


  useEffect(() => {
    if (selectedCards.length === 2) {
      setDisabled(true);
      const [first, second] = selectedCards;

      if (first.name === second.name) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.name === first.name ? { ...card, matched: true } : card
          )
        );
      }
    
      setTimeout(() => {
        setSelectedCards([]);
        setDisabled(false);
      }, 1000);
    }
  }, [selectedCards]);

  const handleCardClick = (card) => {
    if (!disabled && !card.matched && !selectedCards.includes(card)) {
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <div className="game">
      <h1>Memory Card Game</h1>
      <button onClick={() => setCards(shuffleCards())}>Restart Game</button>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${selectedCards.includes(card) || card.matched ? "flipped" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            {selectedCards.includes(card) || card.matched ? card.name : "❓"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;




