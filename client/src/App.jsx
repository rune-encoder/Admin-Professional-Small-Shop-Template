import { Outlet } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { useState, useEffect } from "react";
import Auth from "./utils/auth";

import Login from "./pages/Login.jsx";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeBtn from "./components/UI/ThemeBtn";
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

  // <========== THEME SECTION ==========>
  // Check if user prefers dark mode in their Operating System and set the theme accordingly.
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode.matches);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  // Listen for changes in the theme if user clicked the button.
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (darkMode) {
      rootElement.classList.add("dark");
      rootElement.classList.remove("light");
    } else {
      rootElement.classList.add("light");
      rootElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Listen for changes if user changed theme in their Operating System.
  // This will also apply the theme on this website.
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setDarkMode(e.matches);
    };
    mediaQueryList.addEventListener("change", handleChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  }, [setDarkMode]);

  // ! Revisit Auth Loggedin
  return (
    <ApolloProvider client={client}>
      {!Auth.loggedIn() ? (
        <Login adminData={adminData} setAdminData={setAdminData} />
      ) : (
        <>
          <Sidebar />
          <div className="content">
            <Header adminData={adminData}>
              <ThemeBtn darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </Header>
            <main className="content__main">
              <Outlet />
            </main>
            <Footer />
          </div>
        </>
      )}
    </ApolloProvider>
  );
}

export default App;
