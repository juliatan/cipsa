import { NextResponse } from 'next/server';
import { sheets } from '@googleapis/sheets';
import { googleAuth } from '@/app/auth/googleAuth';

const googleSheets = sheets({ version: 'v4', auth: googleAuth });
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

type FormBodyType = {
  name: string;
  password: string;
  qualifyingFirst: string;
  qualifyingSecond: string;
  qualifyingThird: string;
  raceFirst: string;
  raceSecond: string;
  raceThird: string;
};

type PlayerName = 'Johann' | 'Momo' | 'Oli' | 'Stefania';

export async function POST(request: Request) {
  const body: FormBodyType = await request.json();

  const playersData = await googleSheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Players!A1:B5',
  });

  const players = playersData.data.values || [];
  if (players.length === 0) {
    return NextResponse.json({ error: 'No data found' }, { status: 404 });
  }

  // Authenticate user
  const isValidUser = players.some(
    (player) => player[0] === body.name && player[1] === body.password
  );

  if (!isValidUser) {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }

  // TODO: check submission deadline

  try {
    const values = [
      [body.name, undefined],
      [body.qualifyingFirst, body.raceFirst],
      [body.qualifyingSecond, body.raceSecond],
      [body.qualifyingThird, body.raceThird],
    ];

    const ranges: Record<PlayerName, string[]> = {
      Johann: ['A', 'B'],
      Momo: ['D', 'E'],
      Oli: ['G', 'H'],
      Stefania: ['J', 'K'],
    };

    const playerName = body.name as PlayerName;

    await googleSheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `Inputs!${ranges[playerName][0]}1:${ranges[playerName][1]}4`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return NextResponse.json({ message: 'Results submitted successfully' });
  } catch (error) {
    console.error('Error submitting results:', error);
    return NextResponse.json(
      { message: 'Error submitting results' },
      { status: 500 }
    );
  }
}
