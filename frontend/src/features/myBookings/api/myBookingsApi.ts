import type { BookingDto } from '../models/models';
import api from '../../../api/api';

const BookingService = {
  getByUserId: (userId: string) =>
    api.get<BookingDto[]>(`booking-api/api/booking/user/${userId}`),
  cancelBooking: (bookingId: string) =>
    api.delete(`booking-api/api/booking/${bookingId}`),
};

export default BookingService;
