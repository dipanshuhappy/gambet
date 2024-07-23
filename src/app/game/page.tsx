"use client"
// components/ChessRedirectForm.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

const ChessRedirectForm = () => {
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (inputText.trim()) {
      const url = `https://www.chess.com/callback/live/game/${inputText}`;
      router.push(url);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter game ID"
      />
      <button type="submit">Go to Game</button>
    </form>
  );
};

export default ChessRedirectForm;
