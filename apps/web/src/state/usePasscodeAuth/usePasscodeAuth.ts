import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Location } from 'history';
import { apiClient } from '../api/api';

export function getPasscode(location: Location) {
  const match = location.search.match(/[?&]passcode=(\d+).*$/);
  const passcode = match ? match[1] : window.sessionStorage.getItem('passcode');
  return passcode;
}

export function verifyPasscode(passcode: string) {
  return fetch('/verify-passcode', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `${passcode}`,
    },
  }).then(async res => {
    const jsonResponse = await res.json();
    if (res.status === 401) {
      return { isValid: false, error: jsonResponse.error?.message };
    }
    if (res.ok) {
      return { isValid: true };
    }
  });
}

export function getErrorMessage(message: string) {
  switch (message) {
    case 'passcode incorrect':
      return 'Passcode is incorrect';
    case 'passcode expired':
      return 'Passcode has expired';
    default:
      return message;
  }
}

export default function usePasscodeAuth() {
  const history = useHistory();
  const location = useLocation();

  const [user, setUser] = useState<{ displayName: undefined; photoURL: undefined; passcode: string } | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // add passcode to Authorization header for each api request:
  useEffect(() => {
    const inderceptorId = apiClient.interceptors.request.use(config => {
      config.headers!.authorization = `${user?.passcode}`;
      return config;
    });
    return () => {
      apiClient.interceptors.request.eject(inderceptorId);
    };
  }, [user]);

  useEffect(() => {
    const passcode = getPasscode(location);

    if (passcode && !user) {
      verifyPasscode(passcode)
        .then(verification => {
          if (verification?.isValid) {
            setUser({ passcode } as any);
            window.sessionStorage.setItem('passcode', passcode);
            history.replace(location.pathname);
          }
        })
        .then(() => setIsAuthReady(true));
    } else {
      setIsAuthReady(true);
    }
  }, [history, location, user]);

  const signIn = useCallback((passcode: string) => {
    return verifyPasscode(passcode).then(verification => {
      if (verification?.isValid) {
        setUser({ passcode } as any);
        window.sessionStorage.setItem('passcode', passcode);
      } else {
        throw new Error(getErrorMessage(verification?.error));
      }
    });
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    window.sessionStorage.removeItem('passcode');
    return Promise.resolve();
  }, []);

  return { user, isAuthReady, signIn, signOut };
}
