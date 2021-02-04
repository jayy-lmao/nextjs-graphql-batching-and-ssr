import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../libs/apollo'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}