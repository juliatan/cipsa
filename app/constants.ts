import { PlayerName, QualifyingOrRaceField, SubmitFormData, SubmitFormState } from "./types";

export const QUALIFYING_FIELDS: QualifyingOrRaceField[] = [
  { id: 'qualifyingFirst', label: 'Qualifying first position' },
  { id: 'qualifyingSecond', label: 'Qualifying second position' },
  { id: 'qualifyingThird', label: 'Qualifying third position' },
];

export const RACE_FIELDS: QualifyingOrRaceField[] = [
  { id: 'raceFirst', label: 'Race first position' },
  { id: 'raceSecond', label: 'Race second position' },
  { id: 'raceThird', label: 'Race third position' },
];

export const INITIAL_FORM_DATA: SubmitFormData = {
  name: '' as PlayerName,
  password: '',
  qualifyingFirst: '',
  qualifyingSecond: '',
  qualifyingThird: '',
  raceFirst: '',
  raceSecond: '',
  raceThird: '',
};

export const INITIAL_STATE: SubmitFormState = {
  message: '',
  error: '',
  formData: INITIAL_FORM_DATA,
};
