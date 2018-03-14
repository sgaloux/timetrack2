import { TextArea } from "@blueprintjs/core";
import { observer } from "mobx-react";
import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { FormState } from "final-form";
import { WorkItemType } from "../../store/models/WorkItemModel";
import AutoSave from "../Common/forms/AutoSave";

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
  public render() {
    const { workItem } = this.props;
    return (
      <Form
        onSubmit={() => {}}
        validate={validateForm}
        initialValues={workItem}
        render={({ handleSubmit, valid }) => (
          <form onSubmit={handleSubmit}>
            <AutoSave debounce={500} save={this.props.onSave} />
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
