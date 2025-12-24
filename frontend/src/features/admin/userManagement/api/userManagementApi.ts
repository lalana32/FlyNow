import api from '../../../../api/api';
import type { BookingDto } from '../../../myBookings/models/models';

export const getAllUsers = () => {
  return api.get('/auth-api/api/Auth/users');
};

export const getUserById = (id: string) => {
  return api.get(`auth-api/api/Auth/user/${id}`);
};

export const editUser = (
  id: string,
  data: { firstName: string; lastName: string; email: string; username: string }
) => {
  return api.put(`auth-api/api/Auth/edit/${id}`, data);
};

export const deleteUser = (id: string) => {
  return api.delete(`auth-api/api/Auth/delete/${id}`);
};

export const getBookingByUserId = (userId: string) => {
  return api.get<BookingDto[]>(`booking-api/api/booking/user/${userId}`);
};
