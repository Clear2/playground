import { useRoutes } from 'react-router-dom';
import metaRouters from './config.jsx'
import Login from '@/pages/Login'
import BasicLayout  from '@/layout/BasicLayout'

const router = [
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '/',
    element: <BasicLayout />,
    children: [
      { path: '/', redirect: '/dashboard/analysis' },
      ...metaRouters
    ]
  }
]

const RenderRouter = () => {
  const element = useRoutes(router);
  return element
}

export default RenderRouter