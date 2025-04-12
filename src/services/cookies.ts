import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const getSession = (text: string | null) => {
  if (typeof window === 'undefined') {
    return null;
  } else {
    if (text) return getCookie(text);
    return getCookie('token');
  }
};

export const setSession = (key: string, value: string) => {

  if (typeof window === 'undefined') return null;
  else return setCookie(key, value);
  
};

export const deleteSession = (key: string) => {

  if (typeof window === 'undefined') return null;
  else return deleteCookie(key);

};
