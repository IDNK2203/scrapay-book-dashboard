import { 
  ApolloClient, 
  InMemoryCache, 
} from '@apollo/client';
import { ApolloProvider as BaseApolloProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';
import { useMemo, type ReactNode } from 'react';
import { BaseHttpLink } from '@apollo/client/link/http';


const httpLink = new BaseHttpLink({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
});
interface ApolloProviderProps {
  children: ReactNode;
}

export function ApolloProvider({ children }: ApolloProviderProps) {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const client = useMemo(() => {
    const authLink = new SetContextLink(async (prevContext, _) => {
      const headers = prevContext.headers || {};
      if (!isAuthenticated) {
        return { headers };
      }

      try {
        const token = await getAccessTokenSilently();
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      } catch (error) {
        console.error('Error getting access token:', error);
        return { headers };
      }
    });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }, [getAccessTokenSilently, isAuthenticated]);

  return (
    <BaseApolloProvider client={client}>
      {children}
    </BaseApolloProvider>
  );
}
