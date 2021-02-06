import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import * as actonTypes from "../store/actions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  slot: {
    border: "1px solid #000",
    padding: "0.2em",
  },
}));

const Game = ({ dispatch, slots, balance }) => {
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: actonTypes.HIDEGAME });
  };

  const fakeSpinHandler = () => {
    dispatch({ type: actonTypes.FAKESPIN });
  };

  const randomNumber = () => {
    const number = parseInt(Math.random() * 10);
    if (number === 0) {
      return randomNumber();
    } else {
      return number;
    }
  };

  const spinHandler = () => {
    let remainingBalance = balance - 1;
    const currentSlots = [randomNumber(), randomNumber(), randomNumber()];
    const allSevens = currentSlots.filter((s) => s === 7).length === 3;
    const Threes = currentSlots.filter((s) => s === 3);
    const pair =
      currentSlots[0] === currentSlots[1] ||
      currentSlots[1] === currentSlots[2];
    if (allSevens) {
      remainingBalance += 10;
    } else if (Threes.length) {
      remainingBalance += Threes.length * 5;
    } else if (pair) {
      remainingBalance += 0.5;
    }
    dispatch({
      type: actonTypes.SPIN,
      slots: currentSlots,
      balance: remainingBalance,
    });
  };

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <div style={{ width: "30em" }}>
          <DialogContent>
            <DialogContentText>
              Each Spin Costs $1 - Balance: {balance}
            </DialogContentText>
            <Grid container justify="space-around">
              {slots.map((slot) => (
                <Grid item>
                  <Typography variant="h2" className={classes.slot}>
                    {slot}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={spinHandler}>
              Spin
            </Button>
            <Button
              color="primary"
              variant="outlined"
              onClick={fakeSpinHandler}
            >
              Fake spin
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Game;
