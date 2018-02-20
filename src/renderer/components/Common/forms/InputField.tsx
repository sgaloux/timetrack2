import { FormGroup, Intent } from '@blueprintjs/core';
import React from 'react';
import { Field } from 'react-final-form';

interface IMyFieldProps {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  showErrorDirectly?: boolean;
}

const InputField = ({
  label,
  name,
  placeholder,
  disabled = false,
  type = 'text',
  showErrorDirectly = false,
}: IMyFieldProps) => (
  <Field
    name={name}
    render={({ input, meta }) => (
      <FormGroup
        label={label && `${label} : `}
        labelFor={name}
        disabled={disabled}
        intent={(meta.touched || showErrorDirectly) && meta.error ? Intent.DANGER : Intent.NONE}
        helperText={(meta.touched || showErrorDirectly) && meta.error ? meta.error : ''}
      >
        <input
          className={`pt-input pt-fill ${(meta.touched || showErrorDirectly) &&
            meta.error &&
            'pt-intent-danger'}`}
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...input}
        />
      </FormGroup>
    )}
  />
);
export default InputField;
