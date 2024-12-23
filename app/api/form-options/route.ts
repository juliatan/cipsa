import { googleAuth } from '@/app/auth/googleAuth';
import { sheets } from '@googleapis/sheets';
import { NextResponse } from 'next/server';

const googleSheets = sheets({ version: 'v4', auth: googleAuth });
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function GET() {
  try {
    const driversData = await googleSheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Drivers!A1:A21',
    });

    const playersData = await googleSheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Players!A1:B5',
    });

    const drivers = driversData.data.values || [];
    const players = playersData.data.values || [];

    if (drivers.length === 0 || players.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    const [headers, ...data] = drivers;
    // TODO: simplify
    const options = headers.reduce((acc, header, index) => {
      acc[header] = data.map((row) => row[index]).filter(Boolean);
      return acc;
    }, {} as Record<string, string[]>);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [headersP, ...dataP] = players;

    const playerNames: string[] = [];
    dataP.forEach((row) => playerNames.push(row[0]));

    const response = { options, playerNames };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching options:', error);
    return NextResponse.json(
      { error: 'Failed to fetch options' },
      { status: 500 }
    );
  }
}
