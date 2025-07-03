import React from 'react';
import { Stepper, Step, StepLabel, Box, Button } from '@mui/material';

interface BookingData {
  userId: string;
  totalPrice: string;
  currency: string;
  bookingItems: {
    passengerName: string;
    passengerLastName: string;
    passengerPassportNumber: string;
    seatNumber: string;
    baggageOptions: number;
  }[];
  flightSegments: {
    flightId: string;
    departureAirport: string;
    departureTime: string;
    arrivalAirport: string;
    arrivalTime: string;
    carrierCode: string;
    flightNumber: string;
  }[];
}

interface PaymentStepperProps {
  activeStep: number;
  steps: string[];
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => Promise<void>; // Changed to async
  onFinish: () => void;
  isNextDisabled: boolean;
  isSubmitting: boolean; // Added loading state
}

const PaymentStepper: React.FC<PaymentStepperProps> = ({
  activeStep,
  steps,
  onBack,
  onNext,
  onSubmit,
  onFinish,
  isNextDisabled,
  isSubmitting,
}) => {
  const handleSubmit = async () => {
    try {
      await onSubmit();
    } catch (error) {
      console.error('Booking submission failed:', error);
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        {activeStep !== 0 && (
          <Button onClick={onBack} sx={{ mr: 1 }} disabled={isSubmitting}>
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          <Button
            variant='contained'
            onClick={onFinish}
            disabled={isSubmitting}
          >
            Finish
          </Button>
        ) : activeStep === steps.length - 2 ? (
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Confirm Booking'}
          </Button>
        ) : (
          <Button
            variant='contained'
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
          >
            Next
          </Button>
        )}
      </Box>
    </>
  );
};

export default PaymentStepper;
