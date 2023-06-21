import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

// const client = new ApolloClient({
//     uri: "https://71z1g.sse.codesandbox.io/",    //uri указывает URL-адрес нашего сервера GraphQL
//     cache: new InMemoryCache(),      //cache — это экземпляр InMemoryCache, который клиент Apollo
//     // использует для кэширования результатов запроса после их получения.
//     defaultOptions: {
//         watchQuery: {
//             nextFetchPolicy(
//                 currentFetchPolicy,
//                 {
//                     // Either "after-fetch" or "variables-changed", indicating why the
//                     // nextFetchPolicy function was invoked.
//                     reason,
//                     // The rest of the options (currentFetchPolicy === options.fetchPolicy).
//                     options,
//                     // The original value of options.fetchPolicy, before nextFetchPolicy was
//                     // applied for the first time.
//                     initialPolicy,
//                     // The ObservableQuery associated with this client.watchQuery call.
//                     observable,
//                 }
//             ) {
//                 // When variables change, the default behavior is to reset
//                 // options.fetchPolicy to context.initialPolicy. If you omit this logic,
//                 // your nextFetchPolicy function can override this default behavior to
//                 // prevent options.fetchPolicy from changing in this case.
//                 if (reason === 'variables-changed') {
//                     return initialPolicy;
//                 }
//
//                 if (
//                     currentFetchPolicy === 'network-only' ||
//                     currentFetchPolicy === 'cache-and-network'
//                 ) {
//                     // Demote the network policies (except "no-cache") to "cache-first"
//                     // after the first request.
//                     return 'cache-first';
//                 }
//
//                 // Leave all other fetch policies unchanged.
//                 return currentFetchPolicy;
//             },
//         },
//     },
// });

// client.query({
//     query: gql`
//             query GetLocations{
//                 locations {
//                     id,
//                     name,
//                     description,
//                     photo
//                 }
//             }
//         `,
// })
//     .then((result) => console.log(result));

const client = new ApolloClient({
    uri: "https://sxewr.sse.codesandbox.io/",
    cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
);

reportWebVitals();
