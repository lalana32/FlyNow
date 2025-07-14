import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
//PRIJE PROMJENE
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ConfirmationStep from '../components/ConfirmationStep';
import PassengerDetailsForm from '../components/passengerDetailsForm/PassengerDetailsForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import PaymentStepper from '../components/PaymentStepper';
import { useAppSelector } from '../../../hooks/hooks';

interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const steps = ['Passenger Details', 'Payment Information', 'Confirmation'];

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flightData, selectedTier } = location.state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const userId = useAppSelector((state) => state.auth.user!.data.id);
  const queryParams = new URLSearchParams(location.search);
  const passengers = parseInt(queryParams.get('adults') || '1', 10);
  const [passengerDetails, setPassengerDetails] = useState(() =>
    Array.from({ length: passengers }, () => ({
      firstName: '',
      lastName: '',
      passportNumber: '',
      email: '',
      phone: '',
      baggageOptions: 0,
    }))
  );
  console.log('flight data: ', flightData);
  console.log('putnici: ', passengers);

  const handlePassengerDetailsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPassengerDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };
      return updated;
    });
  };

  const handleSubmitBooking = async () => {
    if (!flightData) {
      console.error('Missing flight data or selected tier');
      return;
    }

    const bookingData = {
      userId: userId,
      totalPrice: (
        parseFloat(flightData.totalPrice) * passengerDetails.length
      ).toFixed(2),
      currency: flightData.currency,
      bookingItems: passengerDetails.map((p) => ({
        passengerName: p.firstName,
        passengerLastName: p.lastName,
        passengerPassportNumber: p.passportNumber,
        seatNumber: '12',
        baggageOptions: p.baggageOptions,
      })),
      flightSegments: [
        {
          flightId: flightData.id,
          departureAirport: flightData.departureAirport,
          departureTime: flightData.departureTime,
          arrivalAirport: flightData.arrivalAirport,
          arrivalTime: flightData.arrivalTime,
          carrierCode: flightData.carrierCode,
          flightNumber: flightData.flightNumber,
        },
      ],
    };

    setIsSubmitting(true);

    try {
      console.log(bookingData);
      const response = await fetch('http://localhost:5004/api/Booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Booking successful:', result);
      handleNext();
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
      setShowSuccessDialog(true);
    }
  };

  const [activeStep, setActiveStep] = useState(0);

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePaymentDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return passengerDetails.map((details, index) => (
          <Box key={index} sx={{ mb: 4, p: 2 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Passenger {index + 1}
            </Typography>
            <PassengerDetailsForm
              details={details}
              onChange={(e) => handlePassengerDetailsChange(index, e)}
            />
          </Box>
        ));

      case 1:
        return (
          <PaymentDetailsForm
            details={paymentDetails}
            onChange={handlePaymentDetailsChange}
          />
        );
      case 2:
        return (
          <ConfirmationStep
            departureAirport={flightData.departureAirport}
            arrivalAirport={flightData.arrivalAirport}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  if (!flightData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant='h6' color='error'>
          No flight data available. Please start the booking process again.
        </Typography>
        <Button
          variant='contained'
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  const isPassengerDetailsValid = passengerDetails.every(
    (p) =>
      p.firstName.trim() !== '' &&
      p.lastName.trim() !== '' &&
      p.passportNumber.trim() !== ''
  );

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant='h4' gutterBottom>
          Complete Your Booking
        </Typography>

        <PaymentStepper
          activeStep={activeStep}
          steps={steps}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmitBooking}
          onFinish={() => navigate('/')}
          isNextDisabled={activeStep === 0 && !isPassengerDetailsValid}
          isSubmitting={isSubmitting}
        />

        {isSubmitting && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {getStepContent(activeStep)}
      </Paper>

      <Dialog
        open={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        aria-labelledby='booking-success-dialog'
      >
        <DialogTitle id='booking-success-dialog'>
          Booking Confirmed!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your reservation has been successfully scheduled.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate('/my-reservations')}
            sx={{ mr: 2 }}
          >
            Go to My Reservations
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setShowSuccessDialog(false);
              navigate(-1);
            }}
          >
            Book Return Flight
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentPage;
