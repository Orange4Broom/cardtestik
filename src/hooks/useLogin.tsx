import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useToastify } from './useToastify';

export interface loginData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const { notify } = useToastify();
  const login = async ({ email, password }: loginData) => {
    try {
      setError(null);
      const res = await signInWithEmailAndPassword(auth, email, password);
      notify('success', 'Uživatel byl přihlášen');
      console.log(res);
    } catch (error) {
      setError((error as Error).message);
      notify('error', 'Přihlášení se nezdařilo');
    }
  };

  return { login };
};
