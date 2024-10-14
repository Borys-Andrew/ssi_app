import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import TheatersIcon from '@mui/icons-material/Theaters';
import { Link, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { AuthContext } from '../context/AuthContext';

const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contacts' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { logout } = useContext(AuthContext);

  const handleUserMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <TheatersIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
            >
              CRUDAPP
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
          >
            {LINKS.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                style={{
                  textDecoration:
                    location.pathname === path ? 'underline' : 'none',
                  color: 'inherit',
                }}
              >
                {label}
              </Link>
            ))}
            <IconButton
              id="resourses-button"
              onClick={handleUserMenuClick}
              aria-controls={open ? 'resourses-menu' : undefined}
              arial-haspopup="true"
              arial-expanded={open ? true : undefined}
              color="inherit"
            >
              <MenuOpenIcon />
            </IconButton>
          </Stack>
          <Menu
            id="resourses-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              'aria-labelledby': 'resourses-button',
            }}
            onClose={handleUserMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem
              onClick={handleUserMenuClose}
              disableRipple
            >
              <PersonOutlineIcon style={{ marginRight: '10px' }} />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => logout()}
              disableRipple
            >
              <LogoutIcon style={{ marginRight: '10px' }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
