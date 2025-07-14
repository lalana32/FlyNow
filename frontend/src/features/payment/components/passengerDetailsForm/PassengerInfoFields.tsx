import React from 'react';
import { GoPersonFill } from 'react-icons/go';
import { MdAssignment } from 'react-icons/md';
import FormInputField from './FormInputField'; // putanja prema fajlu

interface PassengerInfoFieldsProps {
  details: {
    firstName: string;
    lastName: string;
    passportNumber: string;
    email: string;
    phone: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PassengerInfoFields: React.FC<PassengerInfoFieldsProps> = ({
  details,
  onChange,
}) => {
  return (
    <>
      <FormInputField
        label='First Name'
        name='firstName'
        value={details.firstName}
        onChange={onChange}
        icon={<GoPersonFill style={{ marginRight: 8 }} />}
      />
      <FormInputField
        label='Last Name'
        name='lastName'
        value={details.lastName}
        onChange={onChange}
      />
      <FormInputField
        label='Passport Number'
        name='passportNumber'
        value={details.passportNumber}
        onChange={onChange}
        icon={<MdAssignment style={{ marginRight: 8 }} />}
        gridMd={12}
      />
      <FormInputField
        label='Email'
        name='email'
        value={details.email}
        onChange={onChange}
        type='email'
      />
      <FormInputField
        label='Phone Number'
        name='phone'
        value={details.phone}
        onChange={onChange}
      />
    </>
  );
};

export default PassengerInfoFields;
