import React from 'react';
import { FormSpy, FormSpyProps } from 'react-final-form';
import diff from 'object-diff';

interface AutoSaveProps extends FormSpyProps {
  values: any;
  submitting: false;
  debounce: number;
  save: (values: any) => void;
}

interface AutoSaveState {
  values: any;
  submitting: boolean;
}

class AutoSave extends React.Component<AutoSaveProps, AutoSaveState> {
  promise: any;
  timeout!: NodeJS.Timer;
  constructor(props: AutoSaveProps) {
    super(props);
    this.state = { values: props.values, submitting: false };
  }

  componentWillReceiveProps() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.save, this.props.debounce);
  }

  save = async () => {
    if (this.promise) {
      await this.promise;
    }
    const { values, save } = this.props;

    // This diff step is totally optional
    const difference = diff(this.state.values, values);
    if (Object.keys(difference).length) {
      // values have changed
      this.setState({ submitting: true, values });
      this.promise = save(difference);
      await this.promise;
      delete this.promise;
      this.setState({ submitting: false });
    }
  };

  render() {
    // This component doesn't have to render anything, but it can render
    // submitting state.
    return this.state.submitting && <div className="submitting">Submitting...</div>;
  }
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in debounce and save props nicely
export default (props: any) => (
  <FormSpy {...props} subscription={{ values: true }} component={AutoSave} />
);