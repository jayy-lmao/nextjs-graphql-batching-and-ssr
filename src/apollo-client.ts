import {ApolloClient} from 'apollo-client';
import {BatchHttpLink} from "apollo-link-batch-http";
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

/*
  * This all comes from https://dev.to/angad777/setting-up-apollo-graphql-in-next-js-with-server-side-rendering-45l5
  * */

export default function createApolloClient(initialState, ctx) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new BatchHttpLink({
      //uri: 'https://rickandmortyapi.com/graphql', // Server URL (must be absolute)
      uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}
