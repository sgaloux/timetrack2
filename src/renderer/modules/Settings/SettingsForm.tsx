import { Button, Intent } from '@blueprintjs/core';
import { Div } from 'glamorous';
import { observer } from 'mobx-react';
import React from 'react';
import { Form } from 'react-final-form';
import validator from 'validator';
import InputField from '../Common/forms/InputField';
import { ParametersStoreType, ParametersStore } from '../../store';

function validateForm(values: any): any {
  const errors: any = {};
  if (!validator.isURL(values.inflowUrl || '')) {
    errors.inflowUrl = 'URL is invalid !';
  }
  return errors;
}

interface SettingsFormProps {
  settings: ParametersStoreType;
  onSubmit: (values: any) => void;
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
            <Div
              css={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button intent={Intent.SUCCESS} type="submit" disabled={!valid}>
                Save
              </Button>
            </Div>
          </form>
        )}
      />
    );
  }
}
