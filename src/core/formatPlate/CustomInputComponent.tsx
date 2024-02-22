import React from 'react';
import { FieldProps } from 'formik';
import { formatPlate } from './formatPlate';

export const CustomInputComponent: React.FC<FieldProps> = ({
  field,
  form: { setFieldValue },
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPlate(e.target.value);
    setFieldValue(field.name, formattedValue);
  };

  return <input {...field} {...props} value={formatPlate(field.value)} onChange={handleChange} />;
};
