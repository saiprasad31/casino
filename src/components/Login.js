import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import * as actonTypes from "../store/actions";

const Login = ({ dispatch }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleClose = () => {
    dispatch({ type: actonTypes.HIDELOGIN });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setError(true);
      return;
    }
    dispatch({ type: actonTypes.LOGIN, payload: name });
    localStorage.setItem("name", name);
  };

  return (
    <div>
      <Dialog open onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>Enter Your Name To Login.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={error}
              helperText={error ? "Please Enter Name" : null}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Login;
