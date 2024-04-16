import { ApolloProvider } from "@apollo/client";
import { client } from "./utils/apollo/apolloClient.js";
import { useEffect } from "react";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Import Outlet from react-router-dom
import { Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    const setVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh(); 

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
