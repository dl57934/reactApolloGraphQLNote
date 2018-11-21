import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GlobalStyled from "./GlobalStyled";
import client from "./apollo";
import { ApolloProvider } from "react-apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyled />
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
