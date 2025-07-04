import type { BookingDto } from '../models/models';
import api from '../../../api/api';

const BookingService = {
  getByUserId: (userId: string) =>
    api.get<BookingDto[]>(`booking-api/api/booking/user/${userId}`),
};

export default BookingService;
