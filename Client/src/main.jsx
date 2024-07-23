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
import { Provider } from 'react-redux'
import Finder from "./pages/Finder.jsx";
import ProfileUpdate from "./pages/ProfileUpdate.jsx";


const styles = {
  global: (props) => ({
    body: {
      color: mode("#FFFFFF ", "#000000")(props),
      bg: mode("#000000", "#E5E5E5")(props), // Black for light mode, Light gray for dark mode
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    // exact: true,
    element: <Signup />,
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
  },
  {
    path: "/finder",
    exact: true,
    element: <Finder/>,
  },
  {
    path: "/updateprofile",
    exact: true,
    element: <ProfileUpdate/>
  }
]);

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>    
      </ChakraProvider>
  </React.StrictMode>
);
