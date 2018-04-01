import { TextArea } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import AutoSave from '../Common/forms/AutoSave';
import { WorkItemType } from '../../store/WorkItemModel';

interface WorkItemEditFormProps {
  workItem: WorkItemType;
  onSave(values: WorkItemType): void;
}

function validateForm(): any {
  const errors: any = {};
  // if (!validator.isURL(values.inflowUrl || "")) {
  //   errors.inflowUrl = "URL is invalid !";
  // }
  return errors;
}

@observer
export default class WorkItemEditForm extends React.Component<WorkItemEditFormProps> {
  constructor(props: WorkItemEditFormProps) {
    super(props);
  }

  public render() {
    const { workItem } = this.props;
    return (
      <div>
        <Form
          onSubmit={() => ({})}
          validate={validateForm}
          initialValues={workItem}
          render={() => (
            <Fragment>
              <AutoSave debounce={500} save={this.props.onSave} />
              <Field
                name="title"
                render={({ input }) => (
                  <TextArea
                    style={{ width: '350px' }}
                    placeholder="Give a task title..."
                    {...input}
                  />
                )}
              />
            </Fragment>
          )}
        />
      </div>
    );
  }
}
