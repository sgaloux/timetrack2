import React from 'react';
import { observer } from 'mobx-react';
import { Form, Field } from 'react-final-form';
import { Parameters, IParametersType } from '../../store/models/Parameters';
import { FormGroup, Button, Intent } from '@blueprintjs/core';
import glamorous from 'glamorous';

interface IParametersFormProps {
  settings: IParametersType;
  onSubmit(values: IParametersType): void;
}

const ButtonContainer = glamorous.div({
  display: 'flex',
  justifyContent: 'flex-end'
})

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
            <FormGroup label='Inflow URL'  >
              <Field name='inflowUrl' component="input" placeholder="Inflow URL" className="pt-input pt-fill" />
            </FormGroup>
            <FormGroup label='Inflow User'  >
              <Field name='inflowUser' component="input" placeholder="Inflow URL" className="pt-input pt-fill" />
            </FormGroup>
            <FormGroup label='Inflow Password' >
              <Field name='inflowPassword' component="input" placeholder="Inflow URL" className="pt-input pt-fill" type="password" />
            </FormGroup>
            <ButtonContainer>
              <Button intent={Intent.SUCCESS} type="submit">Save</Button>
            </ButtonContainer>
          </form>
        )}
      />


    )
  }
}