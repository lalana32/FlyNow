import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';
import ConfirmationStep from '../components/ConfirmationStep';
import FlightSummary from '../components/FlightSummary';
import PassengerDetailsForm from '../components/PassengerDetailsForm';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import PaymentStepper from '../components/PaymentStepper';
import { useAppSelector } from '../../../hooks/hooks';

interface PassengerDetails {
  firstName: string;
  lastName: string;
  passportNumber: string;
  email: string;
  phone: string;
}

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
  const userId = useAppSelector((state) => state.auth.user!.data.id);

  const handleSubmitBooking = async () => {
    if (!flightData || !selectedTier) {
      console.error('Missing flight data or selected tier');
      return;
    }

    const bookingData = {
      userId: userId, // Get from auth context
      totalPrice: flightData.totalPrice,
      currency: flightData.currency,
      bookingItems: [
        {
          passengerName: passengerDetails.firstName,
          passengerLastName: passengerDetails.lastName,
          passengerPassportNumber: passengerDetails.passportNumber,
          seatNumber: '12', // Make this dynamic if needed
          baggageOptions:
            selectedTier === 'basic' ? 0 : selectedTier === 'regular' ? 1 : 2,
        },
      ],
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
      const response = await fetch('http://localhost:5004/api/Booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // If using auth
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Booking successful:', result);
      handleNext(); // Move to confirmation step
    } catch (error) {
      console.error('Booking failed:', error);
      // Show error to user (you might want to add error state)
    } finally {
      setIsSubmitting(false);
    }
  };

  const [activeStep, setActiveStep] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    firstName: '',
    lastName: '',
    passportNumber: '',
    email: '',
    phone: '',
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePassengerDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPassengerDetails((prev) => ({ ...prev, [name]: value }));
  };

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
        return (
          <PassengerDetailsForm
            details={passengerDetails}
            onChange={handlePassengerDetailsChange}
          />
        );
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

  if (!flightData || !selectedTier) {
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
          isNextDisabled={
            activeStep === 0 &&
            (!passengerDetails.firstName ||
              !passengerDetails.lastName ||
              !passengerDetails.passportNumber)
          }
          isSubmitting={isSubmitting}
        />

        {isSubmitting && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {getStepContent(activeStep)}
      </Paper>

      <FlightSummary flightData={flightData} selectedTier={selectedTier} />
    </Box>
  );
};

export default PaymentPage;
