import { Outlet } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { Provider } from "react-redux";
import { store } from "./utils/store.js";

import { useState, useEffect } from "react";
import Auth from "./utils/auth";

import Login from "./pages/Login.jsx";

import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  // <========== APOLLO CLIENT SECTION ==========>
  const httpLink = createHttpLink({
    uri: "/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // <========== LOGGED-IN ADMIN SECTION ==========>
  const [adminData, setAdminData] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) {
      const { username, permission } =
        Auth.getProfile(token).authenticatedAdmin;
      setAdminData({ username, permission });
    } else {
      setAdminData(false);
    }
  }, []);

  // ! Revisit Auth Loggedin
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
      {!Auth.loggedIn() ? (
        <Login adminData={adminData} setAdminData={setAdminData} />
      ) : (
        <>
          <Sidebar />
          <div className="content">
            <Header adminData={adminData} />
            <main className="content__main">
              <Outlet />
            </main>
            <Footer />
          </div>
        </>
      )}
      </Provider>
    </ApolloProvider>
  );
}

export default App;
