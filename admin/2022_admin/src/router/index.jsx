import { useRoutes } from 'react-router-dom';
import metaRouters from './config.jsx'
import Login from '@/pages/Login'

const router = [
    ...metaRouters,
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