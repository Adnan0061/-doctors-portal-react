import React from 'react';
import { CircularProgress } from '@mui/material';
import { Redirect, Route } from 'react-router';
import useAuth from '../../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isAdmin, isLoading } = useAuth();

    return (
        <>
        {
            isLoading ? <CircularProgress/> :
            <>
                <Route
                    {...rest}
                    render={({ location }) => user.email && isAdmin.admin ? children :
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        ></Redirect>
                    }>
                </Route>
           </>
        }
        </>
    )
};

export default AdminRoute;