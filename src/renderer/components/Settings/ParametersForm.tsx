import React from 'react';
import { observer } from 'mobx-react';
import { Form, Field } from 'react-final-form';
import { Parameters, IParametersType } from '../../store/models/Parameters';
import { FormGroup, Button, Intent } from '@blueprintjs/core';
import glamorous from 'glamorous';
import validator from 'validator';
import InputField from '../Common/forms/InputField';

interface IParametersFormProps {
  settings: IParametersType;
  onSubmit(values: IParametersType): void;
}

const ButtonContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end',
});

function validateForm(values: any): any {
  const errors: any = {};
  if (!validator.isURL(values.inflowUrl || '')) {
    errors.inflowUrl = 'URL is invalid !';
  }
  return errors;
}

@observer
export default class ParametersForm extends React.Component<IParametersFormProps> {
  public render() {
    const { settings, onSubmit } = this.props;
    return (
      <Form
        onSubmit={values => onSubmit(Parameters.create(values))}
        validate={validateForm}
        initialValues={settings}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit}>
            <InputField name="inflowUrl" label="Inflow URL" showErrorDirectly />
            <InputField name="inflowUser" label="Inflow User" />
            <InputField name="inflowPassword" label="Inflow Password" type="password" />
            <ButtonContainer>
              <Button intent={Intent.SUCCESS} type="submit" disabled={!valid}>
                Save
              </Button>
            </ButtonContainer>
          </form>
        )}
      />
    );
  }
}
