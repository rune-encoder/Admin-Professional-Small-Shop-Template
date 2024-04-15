import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apollo/apolloClient.js";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Import Outlet from react-router-dom
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
