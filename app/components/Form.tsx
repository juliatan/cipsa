'use client';

import { useState } from 'react';

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // call backend endpoint
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    console.log('hi');

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/submit-results', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    setMessage(result.message);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username">User Name</label>
          <input id="username" name="username" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="qualifyingFirst">Qualifying First Position</label>
          <input id="qualifyingFirst" name="qualifyingFirst" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="qualifyingSecond">Qualifying Second Position</label>
          <input id="qualifyingSecond" name="qualifyingSecond" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="qualifyingThird">Qualifying Third Position</label>
          <input id="qualifyingThird" name="qualifyingThird" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="raceFirst">Race First Position</label>
          <input id="raceFirst" name="raceFirst" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="raceSecond">Race Second Position</label>
          <input id="raceSecond" name="raceSecond" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="raceThird">Race Third Position</label>
          <input id="raceThird" name="raceThird" required />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center font-medium text-sm">{message}</p>
      )}
    </div>
  );
};
