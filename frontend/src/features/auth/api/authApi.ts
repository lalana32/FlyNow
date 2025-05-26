import api from '../../../api/api';
import type { LoginDto, RegisterDto } from '../models/models';

export const login = (data: LoginDto) => {
  return api.post('/auth-api/api/Auth/login', data);
};

export const register = (data: RegisterDto) => {
  return api.post('/auth-api/api/Auth/login', data);
};
