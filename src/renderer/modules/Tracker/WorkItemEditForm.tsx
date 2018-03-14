import { TextArea } from "@blueprintjs/core";
import { observer } from "mobx-react";
import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { FormState } from "final-form";
import { WorkItemType } from "../../store/models/WorkItemModel";

interface IWorkItemEditForm {
  workItem: WorkItemType;
  onSave(values: WorkItemType): void;
}

function validateForm(values: any): any {
  const errors: any = {};
  // if (!validator.isURL(values.inflowUrl || "")) {
  //   errors.inflowUrl = "URL is invalid !";
  // }
  return errors;
}

@observer
export default class WorkItemEditForm extends React.Component<IWorkItemEditForm> {
  timeout!: NodeJS.Timer;
  private onDataChange = (formState: FormState) => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => this.props.onSave(formState.values as WorkItemType), 500);
  };

  public render() {
    const { workItem } = this.props;
    return (
      <Form
        onSubmit={() => {}}
        validate={validateForm}
        initialValues={workItem}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit}>
            <FormSpy subscription={{ values: true }} onChange={this.onDataChange} />
            <Field
              name="title"
              render={({ input, meta }) => (
                <TextArea placeholder="Give a task title..." {...input} />
              )}
            />
          </form>
        )}
      />
    );
  }
}
