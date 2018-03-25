import { Button, Intent } from '@blueprintjs/core';
import glamorous from 'glamorous';
import { observer } from 'mobx-react';
import React from 'react';
import { Form } from 'react-final-form';
import validator from 'validator';
import { ParametersStore, ParametersType } from '../../store/models/ParametersStore';
import InputField from '../Common/forms/InputField';

interface SettingsFormProps {
  settings: ParametersType;
  onSubmit(values: ParametersType): void;
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
export default class SettingsForm extends React.Component<SettingsFormProps> {
  public render() {
    const { settings, onSubmit } = this.props;
    return (
      <Form
        onSubmit={(values) => onSubmit(ParametersStore.create(values))}
        validate={validateForm}
        initialValues={settings}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit}>
            <InputField name="inflowUrl" label="Inflow URL" showErrorDirectly={true} />
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
