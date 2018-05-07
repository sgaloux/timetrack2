import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Field, Form } from 'react-final-form';
import AutoSave from '../Common/forms/AutoSave';
import { WorkItemType } from '../../store/models';
import { Classes } from '@blueprintjs/core';

interface WorkItemEditFormProps {
  workItem: WorkItemType;

  onSave(values: WorkItemType): void;
}

function validateForm(): any {

  // if (!validator.isURL(values.inflowUrl || "")) {
  //   errors.inflowUrl = "URL is invalid !";
  // }
  return {};
}

@observer
export default class WorkItemEditForm extends React.Component<WorkItemEditFormProps> {
  constructor(props: WorkItemEditFormProps) {
    super(props);
  }

  public render() {
    const { workItem } = this.props;
    return (
      <Form
        onSubmit={() => ({})}
        validate={validateForm}
        initialValues={workItem}
        render={() => (
          <Fragment>
            <AutoSave debounce={500} save={this.props.onSave}/>
            <Field
              name="title"
              render={({ input }) => (
                <input
                  style={{ width: '50%' }}
                  className={Classes.INPUT}
                  placeholder="Give a task title..."
                  {...input}
                />
              )}
            />
          </Fragment>
        )}
      />
    );
  }
}
