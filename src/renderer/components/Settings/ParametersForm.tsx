import React from 'react';
import { observer } from 'mobx-react';
import { Form, Field } from 'react-final-form';
import { Parameters, ParametersType } from '../../store/models/Parameters';

interface IParametersFormProps {
  settings: ParametersType;
  onSubmit(values: ParametersType): void;
}

@observer
export default class ParametersForm extends React.Component<IParametersFormProps> {
  public render() {
    const { settings, onSubmit } = this.props;
    return (
      <Form
        onSubmit={(values) => onSubmit(Parameters.create(values))}
        initialValues={settings}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name='inflowUrl' component="input" placeholder="Inflow URL" />
            <Field name='inflowUser' component="input" placeholder="Inflow User" />
            <Field name='inflowPassword' component="input" placeholder="Inflow Password" type="password" />
            <button type='submit'>Save</button>
          </form>
        )}
      />


    )
  }
}