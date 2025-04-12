import axios from 'axios';

import { getSession } from './cookies';


// Exceção personalizada para erros HTTP
class HttpRequestError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public details?: unknown
  ) {
    super(`Erro HTTP ${status}: ${statusText}`);
    this.name = 'HttpRequestError';
  }
}

// Criação da instância Axios
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_API || 'http://localhost:8888', // Valor fallback
});

// Middleware para capturar requisições no CLIENTE
if (typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    console.log('🔵 Requisição feita pelo cliente:', config.url);
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log('🔴 Erro na requisição:', error);
      return Promise.reject(error);
    }
  );
}

// Centralização de cabeçalhos
const getHeaders = async (token?: string) => ({
  Accept: 'application/json',
  Authorization: token || 'Bearer '+ getSession('session'),
});

// Função para tratar erros de Axios
function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Erro na resposta (status code fora da faixa 2xx)
      //console.error(`Erro: ${error.response.status} - ${error.response.statusText}`);
      
      throw new HttpRequestError(error.response.status, error.response.statusText, error.response.data);
    } else if (error.request) {
      // Requisição feita, mas nenhuma resposta recebida
      //console.error('Nenhuma resposta recebida:', error.request);
      throw new Error('Nenhuma resposta recebida do servidor.');
    } else {
      // Outro tipo de erro (ex.: configuração da requisição)
      //console.error('Erro na configuração:', error.message);
      throw new Error('Erro na configuração da requisição.');
    }
  } else {
    //console.error('Erro desconhecido:', error);
    throw new Error('Ocorreu um erro inesperado.');
  }
}

// Hook de API refatorado
export const useApi = () => ({
  login: async (email: string, password: string) => {

    try {

      const response = await api.post('/auth', {email, password});
      if (response && response.data && response.data.token) {
        return response.data;
      } else {
        return {};
      }

    } catch (error) {
      return {};
    }

  },

  register: async (name: string, email: string, password: string) => {

    try {

      const response = await api.post('/users', {name, email, password});
      if (response && response.data && response.data.token) {
        return response.data;
      } else {
        return {};
      }

    } catch (error) {
      return {};
    }

  },

  read: async (route: string, token?: string) => {
    try {
      const response = await api.get(route, { headers: await getHeaders(token) });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  post: async (route: string, body: any, token?: string) => {
    try {
      const response = await api.post(route, body, { headers: await getHeaders(token) });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  put: async (route: string, body: object, token?: string) => {
    try {
      const response = await api.put(route, body, { headers: await getHeaders(token) });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  delete: async (route: string, token?: string) => {
    try {
      const response = await api.delete(route, { headers: await getHeaders(token) });
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

});
