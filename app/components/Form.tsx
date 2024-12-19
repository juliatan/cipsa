'use client';

import { submitForm } from '@/app/actions/submitForm';
import type {
  OptionsType,
  PlayerName,
  QualifyingOrRaceField,
  SubmitFormData,
  SubmitFormState,
} from '@/app/types';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

const QUALIFYING_FIELDS: QualifyingOrRaceField[] = [
  { id: 'qualifyingFirst', label: 'Qualifying first position' },
  { id: 'qualifyingSecond', label: 'Qualifying second position' },
  { id: 'qualifyingThird', label: 'Qualifying third position' },
];

const RACE_FIELDS: QualifyingOrRaceField[] = [
  { id: 'raceFirst', label: 'Race first position' },
  { id: 'raceSecond', label: 'Race second position' },
  { id: 'raceThird', label: 'Race third position' },
];

const INITIAL_FORM_DATA: SubmitFormData = {
  name: '' as PlayerName,
  password: '',
  qualifyingFirst: '',
  qualifyingSecond: '',
  qualifyingThird: '',
  raceFirst: '',
  raceSecond: '',
  raceThird: '',
};

const initialState: SubmitFormState = {
  message: '',
  error: '',
  formData: INITIAL_FORM_DATA,
};

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export const Form = () => {
  const [state, formAction] = useActionState<SubmitFormState, FormData>(
    submitForm,
    initialState
  );

  const { pending } = useFormStatus();

  const [playerOptions, setPlayerOptions] = useState<OptionsType>([]);
  const [driverOptions, setDriverOptions] = useState<OptionsType>([]);

  // TODO: can this be done from the server?
  useEffect(() => {
    const fetchFormOptions = async () => {
      const response = await fetch('/api/form-options');
      const data = await response.json();
      setDriverOptions(data.options.drivers);
      setPlayerOptions(data.playerNames);
    };
    fetchFormOptions();
  }, []);

  const renderSelect = (
    name: keyof typeof INITIAL_FORM_DATA,
    label: string
  ) => {
    return (
      <div>
        <select
          name={name}
          id={name}
          defaultValue={state.formData[name]}
          className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
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
  };

  // TODO: Fix accessibility
  // TODO: can't seem to get the select option default value to work
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">CIPSA</h1>

        <p className="mt-4 text-gray-500">Enter your forecasts.</p>
      </div>

      <form
        action={formAction}
        className="mx-auto mb-0 mt-8 max-w-md space-y-2"
      >
        <select
          name="name"
          id="name"
          defaultValue={state.formData.name}
          className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        >
          <option value="">Who are you?</option>
          {playerOptions.map((player) => (
            <option key={player} value={player}>
              {player}
            </option>
          ))}
        </select>

        <label htmlFor="password" className="sr-only">
          Password
        </label>

        <input
          type="password"
          name="password"
          id="password"
          defaultValue={state.formData.password}
          className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          placeholder="Your password"
        />

        {QUALIFYING_FIELDS.map((field) => (
          <div className="" key={field.id}>
            {renderSelect(field.id, field.label)}
          </div>
        ))}

        {RACE_FIELDS.map((field) => (
          <div className="" key={field.id}>
            {renderSelect(field.id, field.label)}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {pending
              ? 'Submitting...'
              : state?.error
              ? state.error
              : state?.message
              ? state.message
              : 'Ready to go?'}
          </p>

          <SubmitButton />
        </div>
      </form>
    </div>
  );
};
