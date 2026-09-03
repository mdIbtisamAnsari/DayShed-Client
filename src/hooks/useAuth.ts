import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getUser } from '../services/authApi';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync('accessToken');

        if (accessToken) {
          await getUser(accessToken);
          if (isMounted) setIsSignedIn(true);
        } else {
          if (isMounted) setIsSignedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (isMounted) setIsSignedIn(false);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  return { isLoading, isSignedIn };
};