import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export function GraphqlProvider({children}) {
	return <ApolloProvider client={createClient()}>{children}</ApolloProvider>
}

function createClient(ctx) {
	let host, protocol;
  let hostUrl = process.env.API_URL;

  if (ctx) {
    host = ctx?.req.headers['x-forwarded-host'];
    protocol = ctx?.req.headers['x-forwarded-proto'] || 'http';
    hostUrl = `${protocol}://${host}`;
  } else if (typeof location !== 'undefined') {
    host = location.host;
    protocol = location.protocol;
    hostUrl = `${protocol}//${host}`;
  }

	const client = new ApolloClient({
    uri: `${hostUrl}/api/graphql`,
    cache: new InMemoryCache(),
  });

  return client;
}