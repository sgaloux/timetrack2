import { TextArea, Button, Classes, Intent, Dialog } from '@blueprintjs/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { WorkItemType } from '../../store/models/WorkItemModel';
import AutoSave from '../Common/forms/AutoSave';
import InflowTreeSelector from './InflowTreeSelector';

interface WorkItemEditFormProps {
  workItem: WorkItemType;
  onSave(values: WorkItemType): void;
}

interface WorkItemEditFormState {
  isPopupOpened: boolean;
}

function validateForm(): any {
  const errors: any = {};
  // if (!validator.isURL(values.inflowUrl || "")) {
  //   errors.inflowUrl = "URL is invalid !";
  // }
  return errors;
}

@observer
export default class WorkItemEditForm extends React.Component<
  WorkItemEditFormProps,
  WorkItemEditFormState
> {
  constructor(props: WorkItemEditFormProps) {
    super(props);
    this.state = {
      isPopupOpened: false,
    };
  }

  public render() {
    const { workItem } = this.props;
    return (
      <div>
        <Dialog
          isOpen={this.state.isPopupOpened}
          onClose={this.closePopup}
          title="Select inflow node"
          style={{ width: '80%' }}
        >
          <div className="pt-dialog-body">
            <InflowTreeSelector />
          </div>
        </Dialog>

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
              <Button
                text="Inflow..."
                className={Classes.MINIMAL}
                intent={Intent.PRIMARY}
                onClick={this.openInflowPopup}
              />
              <Button text="Youtrack..." className={Classes.MINIMAL} intent={Intent.PRIMARY} />
            </Fragment>
          )}
        />
      </div>
    );
  }

  private openInflowPopup = () => {
    this.setState({ isPopupOpened: true });
  };

  private closePopup = () => {
    this.setState({ isPopupOpened: false });
  };
}
