import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Notes from "../../Routes/Notes";
import Edit from "../../Routes/Edit";
import Add from "../../Routes/Add";
import Note from "../../Routes/Note";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Notes} />
          <Route path="/edit/:id" component={Edit} />
          <Route path="/add" component={Add} />
          <Route path="/note/:id" component={Note} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
