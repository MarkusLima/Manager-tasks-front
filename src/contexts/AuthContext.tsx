import { createContext, useContext, useState, ReactNode } from 'react';
import { useApi } from '@/services/api';
import { deleteSession, getSession, setSession } from '@/services/cookies';

type User = {
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => void;
  setToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  const login = async (email: string, password: string) => {

    const response = await api.login( email, password );
    console.log(response);
    if (response && response.token) {
      setUser({ token: response.token });
      setSession("token", response.token);
    } else {
      alert('Credenciais inválidas');
    }

  };

  const register = async (name: string, email: string, password: string) => {

    const response = await api.register( name, email, password );
    if (response && response.token) {
      setUser({ token: response.token });
      setSession("token", response.token);
    } else {
      alert('Preencha todos os campos');
    }
  };
  

  const logout = async () => {
    await deleteSession('token');
    setUser(null);
  };

  const getToken = async () => {
    const token = await getSession('token');
    if (token) setUser({ token: token });
    return user?.token;
  };

  const setToken = async (token: string) => {
    setUser({ token: token });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, getToken, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
