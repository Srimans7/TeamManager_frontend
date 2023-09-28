import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import  { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import GroupIcon from '@mui/icons-material/Group';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const BootstrapButton = styled(Button)({
      
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '2px',
  height: '2rem',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

    return ( <div style={{width:"15%", height:"700px", backgroundColor: "#02075d", margin: "10px", borderRadius: "10px"}} >

        <br />

        <Stack spacing={2} direction="column" gap='3px' alignItems= 'center'>
        <h3 style={{ color: 'white' }}>Teams Assigner</h3>
      
      <BootstrapButton variant="contained" disableRipple>
        <Link style={{ textDecoration: 'none' }} to='/employees'><h3 style={{ color: 'white' }} ><pre>  <AccountCircleIcon />Employees  </pre></h3></Link>
      </BootstrapButton>
      <BootstrapButton variant="contained" disableRipple>
         <Link style={{ textDecoration: 'none' }} to='/projects'><h3 style={{ color: 'white' }} ><pre>   <FolderIcon />Projects  </pre></h3></Link>
      </BootstrapButton>
      <BootstrapButton variant="contained" disableRipple>
        <Link style={{ textDecoration: 'none' }} to='/'><h3 style={{ color: 'white' }} ><pre>    <GroupIcon />Teams    </pre></h3></Link>
      </BootstrapButton>
    </Stack>
        </div>
       



    );
    
}
export default ResponsiveAppBar;
