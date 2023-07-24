import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import LiftsList from './components/LiftsList';
import './App.css'

const client = new ApolloClient({
  uri: 'https://snowtooth.moonhighway.com/', // Перевірте, чи правильний URL GraphQLAPI
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
    <div className='container'>
      <LiftsList />
    </div>
    </ApolloProvider>
  );
};

export default App;
