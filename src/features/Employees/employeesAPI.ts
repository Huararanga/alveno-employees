import axios from 'axios';

import { Employee, InsertEmployee, UpdateEmployee } from './types';

const SUPBASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rdGViZGhzcHp2cHdndXFja3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAzODM3MzMsImV4cCI6MTk5NTk1OTczM30.t6mer5mCMjchDnd5BOi_pozsve9uSEeE3TtNry2SJ5Y';
const AUTHORIZATION = `Bearer ${SUPBASE_KEY}`;

export async function getEmployeesAPI() {
  try {
    const { data } = await axios.get<Employee[]>(
      'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees?select=*',
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

export async function addEmployeeAPI(input: InsertEmployee) {
  try {
    const { data } = await axios.post<InsertEmployee[]>(
      'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees',
      input,
      {
        headers: {
          apikey: SUPBASE_KEY,
          Authorization: AUTHORIZATION,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
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

export async function updateEmployeeAPI(input: UpdateEmployee) {
  try {
    const { data } = await axios.patch<Employee[]>(
      'https://nktebdhspzvpwguqcksn.supabase.co/rest/v1/employees',
      input,
      {
        headers: {
          apikey: SUPBASE_KEY,
          Authorization: AUTHORIZATION,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        params: {
          id: `eq.${input.id}`
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