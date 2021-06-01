import React from 'react';
import Constants from '@root/constants';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Gear from '../assets/settingsIcon.svg';
import { logoutUser } from '../lib/airlock/airlock';

export default function SettingsDropdown(props) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleLogoutClick = async () => {
    const { history } = props;
    const logOutSuccess = await logoutUser();
    if (logOutSuccess) {
      history.push('/');
    } else {
      // TODO: Display error to user (also wonder if there's a way to encapsulate this logic in auth.js)
      console.warn('Logout failed');
    }
  };

  return (
    <div className="settings-dropdown inline">
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <img alt="nav item gear" src={Gear} />
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
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className="dropdown-menu"
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to={Constants.ABOUT_ROUTE} className="dropdown-link">
                      About
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <Link
                      to={Constants.PROFILE_ROUTE}
                      className="dropdown-link"
                    >
                      Settings
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleLogoutClick}>
                    <div className="dropdown-link">Logout</div>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
