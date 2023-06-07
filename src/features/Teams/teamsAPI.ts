import axios from 'axios';

import { Team } from './types';

const SUPBASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rdGViZGhzcHp2cHdndXFja3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzODM3MzMsImV4cCI6MTk5NTk1OTczM30.t6mer5mCMjchDnd5BOi_pozsve9uSEeE3TtNry2SJ5Y';
const AUTHORIZATION = `Bearer ${SUPBASE_KEY}`;

export async function getTeamsAPI() {
  try {
    const { data } = await axios.get<Team[]>(
      'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/teams?select=*',
      {
        headers: {
          apikey: SUPBASE_KEY,
          Authorization: AUTHORIZATION,
        },
      },
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    } else {
      throw new Error('unexpected error');
    }
  }
}
