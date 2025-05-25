import api from '../../../api/api';

export const login = (data: { username: string; password: string }) => {
  return api.post('/auth-api/api/Auth/login', data);
};
