'use server';

import { googleAuth } from '@/app/auth/googleAuth';
import { sheets } from '@googleapis/sheets';
import { revalidatePath } from 'next/cache';
import { PlayerName, SubmitFormData, SubmitFormState } from '../types';

const googleSheets = sheets({ version: 'v4', auth: googleAuth });
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

export const submitForm = async (
  _: SubmitFormState,
  formData: FormData
): Promise<SubmitFormState> => {
  const data = Object.fromEntries(
    formData.entries()
  ) as unknown as SubmitFormData;

  const playersData = await googleSheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Players!A1:B5',
  });

  const players = playersData.data.values || [];
  if (players.length === 0) {
    return { error: 'No data found', formData: data };
  }

  const isValidUser = players.some(
    (player) => player[0] === data['name'] && player[1] === data['password']
  );

  if (!isValidUser) {
    return { error: 'Invalid credentials', formData: data };
  }

  // TODO: check submission deadline

  try {
    const playerName = data['name'] as PlayerName;

    const values = [
      [playerName, undefined],
      [data['qualifyingFirst'], data['raceFirst']],
      [data['qualifyingSecond'], data['raceSecond']],
      [data['qualifyingThird'], data['raceThird']],
    ];

    const ranges: Record<PlayerName, string[]> = {
      Johann: ['A', 'B'],
      Momo: ['D', 'E'],
      Oli: ['G', 'H'],
      Stefania: ['J', 'K'],
    };

    await googleSheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `Inputs!${ranges[playerName][0]}1:${ranges[playerName][1]}4`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    revalidatePath('/');
    return { message: 'Results submitted successfully', formData: data };
  } catch (error) {
    console.error('Error submitting results:', error);
    return { error: 'Error submitting results', formData: data };
  }
};
