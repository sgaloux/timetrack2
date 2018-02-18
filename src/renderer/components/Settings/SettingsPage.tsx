import { inject, observer } from "mobx-react";
import React, { Component } from "react";

@inject("store")
@observer
class SettingsPage extends Component {
  public render() {
    return (
      <div>
        Parameters
      </div>
    );
  }
}

export default SettingsPage;
