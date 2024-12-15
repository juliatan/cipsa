'use client';

import { useEffect, useState } from 'react';

type OptionsType = string[];

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [playerOptions, setPlayerOptions] = useState<OptionsType>([]);
  const [driverOptions, setDriverOptions] = useState<OptionsType>([]);

  // TODO: think about where this call should be made
  useEffect(() => {
    const fetchFormOptions = async () => {
      const response = await fetch('/api/form-options');
      const data = await response.json();
      setDriverOptions(data.options.drivers);
      setPlayerOptions(data.playerNames);
    };
    fetchFormOptions();
  }, []);

  //  const renderSelect = (name: string, label: string) => (
  //    <div className="space-y-2">
  //      <label htmlFor={name}>{label}</label>
  //      <select name={name} required>
  //        <SelectTrigger>
  //          <SelectValue placeholder={`Select ${label}`} />
  //        </SelectTrigger>
  //        <SelectContent>
  //          {options[name]?.map((option) => (
  //            <SelectItem key={option} value={option}>
  //              {option}
  //            </SelectItem>
  //          ))}
  //        </SelectContent>
  //      </select>
  //    </div>
  //  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: use form actions
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/submit', {
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

  // TODO: Fix form styling

  return (
    <div>
      <h3>Drivers</h3>
      {driverOptions?.map((opt) => (
        <p key={opt}>{opt}</p>
      ))}
      <h3>Players</h3>
      {playerOptions?.map((opt) => (
        <p key={opt}>{opt}</p>
      ))}
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
