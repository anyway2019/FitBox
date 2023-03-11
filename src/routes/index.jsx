import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Root,{loader as rootLoader,action as rootAction} from "./root";
import ErrorPage from './error-page';
import Activity,{loader as contactLoader,action as contactAction}from './activity';
import EditContact,{action as editAction} from './edit';
import {action as deleteAction} from './delete';
import Home from './home';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Root></Root> ,
    errorElement: <ErrorPage />,
    loader:rootLoader,
    action:rootAction,
    children:[{
        errorElement:<ErrorPage/>,
        children:[
            {
                index:true,
                element:<Home/>
            },
            { 
                path: '/activities/:activityId', 
                element: <Activity /> ,
                loader:contactLoader,
                action:contactAction,
            },
            { 
                path: '/activities/:activityId/edit', 
                element: <EditContact /> ,
                loader:contactLoader,
                action:editAction,
            },
            { 
                path: '/activities/:activityId/delete', 
                action:deleteAction,
            },
        ]
    }]
    },
]);
export default router;