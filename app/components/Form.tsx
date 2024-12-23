'use client';

import { submitForm } from '@/app/actions/submitForm';
import {
  INITIAL_FORM_DATA,
  INITIAL_STATE,
  QUALIFYING_FIELDS,
  RACE_FIELDS,
} from '@/app/constants';
import type { SubmitFormState } from '@/app/types';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const SubmitButton: React.FC = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white disabled:opacity-50"
      disabled={pending}
      aria-disabled={pending}
      aria-busy={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

type FormProps = {
  drivers: string[];
  players: string[];
};

export const Form: React.FC<FormProps> = ({ drivers, players }) => {
  const [state, formAction, pending] = useActionState<SubmitFormState, FormData>(
    submitForm,
    INITIAL_STATE
  );

  const renderSelect = (
    name: keyof typeof INITIAL_FORM_DATA,
    label: string
  ) => {
    return (
      <div>
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
        <select
          name={name}
          id={name}
          defaultValue={state.formData[name]}
          className="w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
        >
          <option value="">{label}</option>
          {drivers.map((driver) => (
            <option key={driver} value={driver}>
              {driver}
            </option>
          ))}
        </select>
      </div>
    );
  };

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
        {/* For screen readers to organise grouping of fields */}
        <fieldset>
          <legend className="sr-only">Personal Information</legend>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <select
            name="name"
            id="name"
            defaultValue={state.formData.name}
            required
            aria-required="true"
            className="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
          >
            <option value="">Who are you?</option>
            {players.map((player) => (
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
            required
            aria-required="true"
            defaultValue={state.formData.password}
            className="mt-2 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            placeholder="Your password"
          />
        </fieldset>

        <fieldset>
          <legend className="sr-only">Qualifying Positions</legend>
          {QUALIFYING_FIELDS.map((field) => (
            <div className="mt-2" key={field.id}>
              {renderSelect(field.id, field.label)}
            </div>
          ))}
        </fieldset>

        <fieldset>
          <legend className="sr-only">Race Positions</legend>
          {RACE_FIELDS.map((field) => (
            <div className="mt-2" key={field.id}>
              {renderSelect(field.id, field.label)}
            </div>
          ))}
        </fieldset>

        <div className="flex items-center justify-between">
          {state.error || state.message ? (
            <p
              className={`text-sm ${
                state.error ? 'text-red-600' : 'text-green-600'
              }`}
              role="status"
              aria-live="polite"
            >
              {state.error || state.message}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              {pending ? 'Submitting' : 'Ready to go?'}
            </p>
          )}

          <SubmitButton />
        </div>
      </form>
    </div>
  );
};
