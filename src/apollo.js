import { InMemoryCache, ApolloLink } from "apollo-boost";
import { typeDefs, resolvers, defaults } from "./clientState";
import { withClientState } from "apollo-link-state";
import ApolloClient from "apollo-client";

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  typeDefs,
  resolvers,
  defaults
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink]),
  connectToDevTools: true
});

export default client;
