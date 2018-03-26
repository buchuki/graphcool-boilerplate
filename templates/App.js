import React, { Component } from "react";
import AuthButton from "./authentication/AuthButton.js";

class App extends Component {
  render() {
    return (
      <div>
        Something <AuthButton />
      </div>
    );
  }
}

export default App;
