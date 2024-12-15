import { auth } from '@googleapis/sheets';
import { GoogleAuth } from 'google-auth-library';

let googleAuthInstance: GoogleAuth | null = null;

const createGoogleAuth = () => {
  if (!googleAuthInstance) {
    googleAuthInstance = new auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.GOOGLE_JWT_PROJECT_ID,
        private_key_id: process.env.GOOGLE_JWT_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_JWT_PRIVATE_KEY,
        client_email: process.env.GOOGLE_JWT_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_JWT_CLIENT_ID,
        universe_domain: 'googleapis.com',
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }
  return googleAuthInstance;
};

export const googleAuth = createGoogleAuth();
