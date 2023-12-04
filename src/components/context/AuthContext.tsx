import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';

// Define the shape of your application's User object
interface User {
  uid: string;
  email: string;
  displayName: string;
  role?: string;
}

interface AuthState {
  user: Omit<User, 'role'> | null;
  authIsReady: boolean;
}

interface DefaultLayoutProps {
  children: ReactNode;
}

export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

// Define action types
type AuthAction =
  | { type: 'LOGIN'; payload: User | null }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_IS_READY'; payload: User | null };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: DefaultLayoutProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Extract the necessary information from the Firebase user object
      const user = firebaseUser
        ? {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
          }
        : null;

      dispatch({ type: 'AUTH_IS_READY', payload: user });
    });

    return () => {
      // Ensure to unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);

  console.log('state', state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
