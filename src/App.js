import React, { useEffect, useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import appReducer from "./store/reducers/appReducer";
import initialState from "./store/state";
import * as actonTypes from "./store/actions";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Table from "./components/Table";
import Game from "./components/Game";

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {
    loggedIn,
    showLoginDialog,
    name,
    balance,
    showGameDialog,
    slots,
    results,
  } = state;

  useEffect(() => {
    const name = localStorage.getItem("name");
    const currentBalance = localStorage.getItem("currentBalance");
    const results = localStorage.getItem("results");
    if (name) {
      dispatch({ type: actonTypes.LOGIN, payload: name });
    }
    if (currentBalance) {
      dispatch({ type: actonTypes.UPDATEBALANCE, payload: currentBalance });
    }
    if (results) {
      dispatch({
        type: actonTypes.UPDATERESULTS,
        payload: JSON.parse(results),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentBalance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("results", JSON.stringify(results));
  }, [results]);

  const playHandler = () => {
    dispatch({ type: actonTypes.OPENGAME });
  };

  return (
    <div>
      <Header
        loggedIn={loggedIn}
        name={name}
        balance={balance}
        dispatch={dispatch}
      />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ margin: "5em auto" }}
      >
        <Grid item style={{ width: "60%" }}>
          {results.length ? (
            <Table results={results} />
          ) : (
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginBottom: "2em" }}
            >
              Play the game to See results
            </Typography>
          )}
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={playHandler}>
            Play Game
          </Button>
        </Grid>
      </Grid>
      <Footer />

      {showLoginDialog && <Login dispatch={dispatch} />}

      {showGameDialog && (
        <Game dispatch={dispatch} slots={slots} balance={balance} />
      )}
    </div>
  );
};

export default App;
