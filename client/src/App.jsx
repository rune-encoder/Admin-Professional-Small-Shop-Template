import { Outlet } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import { useState, useEffect } from "react";

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

  // <========== LOGIN SECTION ==========>
  // !Revisit
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("id_token"));

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

  return (
    <ApolloProvider client={client}>
      {!isLoggedIn ? (
        <Login />
      ) : (
        <>
          <Sidebar />
          <div className="content">
            <Header>
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
