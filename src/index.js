// React, Redux, Middleware
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

// root reducer and root saga
import rootReducer from "./redux/reducers/_root.reducer";
import rootSaga from "./redux/sagas/_root.saga";

// App
import App from "./components/App/App";

// MUI
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

// Theme/Palette/Font declaration
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#455a64",
    },
    secondary: {
      main: "#bf360c",
    },
    background: {
      default: "#1c313a",
      paper: "#455a64",
    },
  },

  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

// Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// this line creates an array of all of redux middleware you want to use
// we don't want a whole ton of console logs in our production code
// logger will only be added to your project if your in development mode
const middlewareList =
  process.env.NODE_ENV === "development"
    ? [sagaMiddleware, logger]
    : [sagaMiddleware];

const store = createStore(
  // tells the saga middleware to use the rootReducer
  // rootSaga contains all of our other reducers
  rootReducer,
  // adds all middleware to our project including saga and logger
  applyMiddleware(...middlewareList)
);

// tells the saga middleware to use the rootSaga
// rootSaga contains all of our other sagas
sagaMiddleware.run(rootSaga);

// Render, ThemeProvider, Redux Provider, CSSBaseline
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("react-root")
);
