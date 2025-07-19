import api from '../../../api/api';

const PaymentService = {
  addBooking: (bookingData: any) =>
    api.post(`booking-api/api/booking`, bookingData),
};

export default PaymentService;
