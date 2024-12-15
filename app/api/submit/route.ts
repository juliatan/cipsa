import { NextResponse } from 'next/server';
import { sheets, auth } from '@googleapis/sheets';

const authRequest = new auth.GoogleAuth({
  keyFilename: 'googlekey.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const googleSheets = sheets({ version: 'v4', auth: authRequest });
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

type FormBodyType = {
  username: string;
  password: string;
  qualifyingFirst: string;
  qualifyingSecond: string;
  qualifyingThird: string;
  raceFirst: string;
  raceSecond: string;
  raceThird: string;
};

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
    (player) => player[0] === body.username && player[1] === body.password
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
      [body.username, undefined],
      [body.qualifyingFirst, body.raceFirst],
      [body.qualifyingSecond, body.raceSecond],
      [body.qualifyingThird, body.raceThird],
    ];

    const ranges = {
      Johann: ['A', 'B'],
      Momo: ['D', 'E'],
      Oli: ['G', 'H'],
      Stefania: ['J', 'K'],
    };

    // Append data to Google Sheet
    await googleSheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `Inputs!${ranges[body.username][0]}1:${ranges[body.username][1]}4`,
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
