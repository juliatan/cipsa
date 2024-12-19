export type FieldName =
  | 'name'
  | 'password'
  | 'qualifyingFirst'
  | 'qualifyingSecond'
  | 'qualifyingThird'
  | 'raceFirst'
  | 'raceSecond'
  | 'raceThird';

export type QualifyingOrRaceField = { id: FieldName; label: string };

export type PlayerName = 'Johann' | 'Momo' | 'Oli' | 'Stefania';

export type SubmitFormData = {
  name: PlayerName;
  password: string;
  qualifyingFirst: string;
  qualifyingSecond: string;
  qualifyingThird: string;
  raceFirst: string;
  raceSecond: string;
  raceThird: string;
}

export type SubmitFormState = {
  message?: string;
  error?: string;
  formData: SubmitFormData;
};
