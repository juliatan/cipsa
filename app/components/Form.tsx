'use client';

import { useEffect, useState } from 'react';

type OptionsType = string[];

const QUALIFYING_FIELDS = [
  { id: 'qualifyingFirst', label: 'Qualifying first position' },
  { id: 'qualifyingSecond', label: 'Qualifying second position' },
  { id: 'qualifyingThird', label: 'Qualifying third position' },
];

const RACE_FIELDS = [
  { id: 'raceFirst', label: 'Race first position' },
  { id: 'raceSecond', label: 'Race second position' },
  { id: 'raceThird', label: 'Race third position' },
];

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

  const renderSelect = (name: string, label: string) => (
    <div>
      {/* <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {' '}
        {label}
      </label> */}

      <select
        name={name}
        id={name}
        className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
      >
        <option value="">{label}</option>
        {driverOptions.map((driver) => (
          <option key={driver} value={driver}>
            {driver}
          </option>
        ))}
      </select>
    </div>
  );

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
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">CIPSA</h1>

        <p className="mt-4 text-gray-500">Enter your forecasts.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          {/* <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {' '}
        {label}
      </label> */}

          <select
            name="name"
            id="name"
            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Who are you?</option>
            {playerOptions.map((player) => (
              <option key={player} value={player}>
                {player}
              </option>
            ))}
          </select>
        </div>
        {/* <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>

          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Your name"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div> */}

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              name="password"
              id="password"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Your password"
            />

            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>

          {QUALIFYING_FIELDS.map((field) => (
            <div className="space-y-4" key={field.id}>
              {renderSelect(field.id, field.label)}
            </div>
          ))}

          {RACE_FIELDS.map((field) => (
            <div className="space-y-4" key={field.id}>
              {renderSelect(field.id, field.label)}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          {/* <p className="text-sm text-gray-500">Ready to go?</p> */}
          <p className="text-sm text-gray-500">
            {message ? message : 'Ready to go?'}
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>

    // <div>
    //   <h3>Drivers</h3>
    //   {driverOptions?.map((opt) => (
    //     <p key={opt}>{opt}</p>
    //   ))}
    //   <h3>Players</h3>
    //   {playerOptions?.map((opt) => (
    //     <p key={opt}>{opt}</p>
    //   ))}
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div className="space-y-2">
    //       <label htmlFor="username">User Name</label>
    //       <input id="username" name="username" required />
    //     </div>
    //     <div className="space-y-2">
    //       <label htmlFor="password">Password</label>
    //       <input id="password" name="password" type="password" required />
    //     </div>
    //     {QUALIFYING_FIELDS.map((field) => (
    //       <div className="space-y-2" key={field.id}>
    //         {renderSelect(field.id, field.label)}
    //       </div>
    //     ))}

    //     {RACE_FIELDS.map((field) => (
    //       <div className="space-y-2" key={field.id}>
    //         {renderSelect(field.id, field.label)}
    //       </div>
    //     ))}

    //     <button type="submit" disabled={isLoading}>
    //       {isLoading ? 'Submitting...' : 'Submit'}
    //     </button>
    //   </form>
    //   {message && (
    //     <p className="mt-4 text-center font-medium text-sm">{message}</p>
    //   )}
    // </div>
  );
};
