import api from '../../../api/api';
import type { EditUserDto } from '../models/models';

export const editUserInfo = (data: EditUserDto, userId: string) => {
  return api.put(`/auth-api/api/Auth/edit/${userId}`, data);
};
