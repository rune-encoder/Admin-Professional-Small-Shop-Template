import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apolloClient.js";

import { Provider } from "react-redux";
import { store } from "./utils/store.js";

import Content from "./Content";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Content />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
