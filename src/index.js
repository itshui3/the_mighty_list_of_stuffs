import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { 
  ApolloClient, 
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

require('dotenv').config()

const client = new ApolloClient({
  uri: process.env.GQL_URI,
  cache: new InMemoryCache()
});

console.log('env TEST', process.env.TEST)

ReactDOM.render(

<React.StrictMode>
<ApolloProvider client={client}>

<App />

</ApolloProvider>
</React.StrictMode>,
document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
