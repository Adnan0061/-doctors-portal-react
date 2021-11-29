import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import AppoinmentsDashBoard from './AppoinmentsDashBoard/AppoinmentsDashBoard';
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import MakeAdmin from './MakeAdmin/MakeAdmin';
import AddDoctor from './AddDoctor/AddDoctor';
import useAuth from '../../hooks/useAuth';
import AdminRoute from '../Login/Login/AdminRoute/AdminRoute';
import Payment from './Payment/Payment';

const drawerWidth = 200;

function DashBoard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, isAdmin } = useAuth()

  let { path, url } = useRouteMatch();


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

        <Link style={{textDecoration:'none'}} to={`${url}`}><Button sx={{ color:'black', textDecoration:'none'}}>DashBoard</Button></Link>

        {isAdmin.admin && <Link style={{textDecoration:'none'}} to={`${url}/make-admin`}><Button sx={{textDecoration:'none', color:'black'}}>Make Admin</Button></Link>}

        {isAdmin.admin && <Link style={{textDecoration:'none'}} to={`${url}/add-doctor`}><Button sx={{textDecoration:'none', color:'black'}}>Add Doctor</Button></Link>}

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
          >
              <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }} noWrap component="div">
              DASHBOARD: <span style={{color: 'lightgreen'}}> {user.email}</span>
          </Typography>
          <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}><Typography sx={{paddingX: 4, paddingY:1.1, borderRadius: 1, color: '#000', backgroundColor: '#A7E063' }} noWrap component="div">
              Go To Home
          </Typography>
          </Link>
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Container>
            <Switch>
                <Route exact path={path}>
                    <AppoinmentsDashBoard/>
                </Route>
                <Route path={`${path}/payment/:appointmentId`}>
                    <Payment/>
                </Route>
                <AdminRoute path={`${path}/make-admin`}>
                    <MakeAdmin/>
                </AdminRoute>
                <AdminRoute path={`${path}/add-doctor`}>
                    <AddDoctor/>
                </AdminRoute>
            </Switch>
        </Container>
      </Box>
    </Box>
  );
}

DashBoard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashBoard;
