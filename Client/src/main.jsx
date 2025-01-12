import * as React from "react";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { mode } from "@chakra-ui/theme-tools";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import { store } from './store/store.js'
import { Provider, useSelector } from 'react-redux'
import Finder from "./pages/Finder.jsx";
import ProfileUpdate from "./pages/ProfileUpdate.jsx";
import RequestsTab from "./pages/RequestsTab.jsx";
import Messages from "./pages/Messages.jsx";
import QuestionsUpdater from "./pages/QuestionsUpdater.jsx";


const styles = {
  global: (props) => ({
    body: {
      color: mode("#FFFFFF", "#FFFFFF ")(props),
      bg: mode("#000000", "#000000")(props), // Black for light mode, Light gray for dark mode
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const colors = {
  gray: {
    light: "#F2F2F2",
    dark: "#1A1A1A",
  },
};

const theme = extendTheme({ config, colors, styles });

const AppRouter = () => {
  const userState = useSelector((state) => state.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: userState.id ? <Home /> : <Login/>,
    },
    {
      path: "/signup",
      element: userState.id ? <Home/> : <Signup />,
    },
    {
      path: "/login",
      exact: true,
      element: userState.id ? <Home/> : <Login />,
    },
    {
      path: "/finder",
      exact: true,
      element: userState.id ? <Finder/> : <Login/>,
    },
    {
      path: "/questionupdate",
      exact: true,
      element: userState.id ? <QuestionsUpdater/> : <Login/>
    },
    {
      path: "/updateprofile",
      exact: true,
      element: userState.id ? <ProfileUpdate/> : <Login/>
    },
    {
      path: "/requests",
      exact: true,
      element: userState.id ? <RequestsTab/> : <Login/>
    },
    {
      path: "/messages",
      exact: true,
      element: userState.id ? <Messages/> : <Login/>
    },
    
  ]);

  return <RouterProvider router={router} />;
};

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
