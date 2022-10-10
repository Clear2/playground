import WrapperRouteComponent from './config';
import { useRoutes } from "react-router-dom";

import { BasicLayout } from '../layout/BasicLayout.jsx'
import DashBoard from '../pages/DashBoard'
import Login from '../pages/Login'
const router = [
  {
    path: '/',
    element: <WrapperRouteComponent><BasicLayout /></WrapperRouteComponent>,
    children: [
      {
        path: '/dashboard',
        element: <WrapperRouteComponent><DashBoard /></WrapperRouteComponent>
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]


const RenderRouter = () => {
  const element = useRoutes(router);
  return element
}

export default RenderRouter