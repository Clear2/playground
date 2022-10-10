import PrivateRoute from './pravateRoute'
import { useIntl } from 'react-intl'

const WrapperRouteComponent = ({ auth, children }) => {
  const { formatMessage } = useIntl()

  if (auth) {
    return <PrivateRoute>{children}</PrivateRoute>
  }
  return <>{children}</>
}

export default WrapperRouteComponent