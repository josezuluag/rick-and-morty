'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/?page=1')
      .then(response => {
        setCharacters(response.data.results.slice(0, 20));
      })
      .catch(error => console.error(error));
  }, []);

  const handleCardClick = (character) => {
    setSelectedCharacter(character);
  };

  const closeCard = (e) => {
    e.stopPropagation();
    setSelectedCharacter(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <AnimatePresence>
          {characters.map((character) => (
            <motion.div
              key={character.id}
              className={`${styles.card} ${selectedCharacter?.id === character.id ? styles.selectedCard : ''}`}
              onClick={() => handleCardClick(character)}
              layout
              transition={{ duration: 0.5 }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardFront}>
                  <img src={character.image} alt={character.name} className={styles.cardImage} />
                </div>
                <div className={styles.cardBack}>
                  <img src={character.image} alt={character.name} className={styles.cardBackImage} />
                  <div className={styles.cardInfo}>
                    <h2>{character.name}</h2>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Origin: {character.origin.name}</p>
                  </div>
                </div>
              </div>
              {selectedCharacter?.id === character.id && (
                <button className={styles.closeButton} onClick={closeCard}>X</button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}