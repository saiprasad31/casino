import React, { useEffect, useState, useRef } from "react";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import * as actonTypes from "../store/actions";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 1px #D7D8D9",
  },
  buttoncontainer: {
    marginLeft: "auto",
  },
  signupButton: {
    marginLeft: "1em",
  },
  profile: {
    marginLeft: "1em",
  },
  avtar: {
    backgroundColor: "#5F7685",
  },
}));

const Header = (props) => {
  const { dispatch, loggedIn, name, balance } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = () => {
    setOpen(false);
    dispatch({ type: actonTypes.LOGOUT });
    localStorage.removeItem("name");
  };

  const handleLogin = () => {
    dispatch({ type: actonTypes.SHOWLOGIN });
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (anchorRef.current && prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          color="transparent"
          classes={{ root: classes.header }}
          position="static"
        >
          <Toolbar>
            <ButtonBase disableRipple disableTouchRipple>
              <Typography variant="h4">CASINO</Typography>
            </ButtonBase>

            <Grid className={classes.buttoncontainer}>
              <Typography variant="h6" component="span">
                Balance: ${balance}
              </Typography>
              {loggedIn ? (
                <>
                  <IconButton
                    onClick={handleToggle}
                    ref={anchorRef}
                    className={classes.profile}
                  >
                    <Avatar
                      alt={name.slice(0, 2).toUpperCase()}
                      className={classes.avtar}
                    >
                      {name.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === "bottom"
                              ? "center top"
                              : "center bottom",
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="menu-list-grow"
                              onKeyDown={handleListKeyDown}
                            >
                              <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.signupButton}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};

export default Header;
