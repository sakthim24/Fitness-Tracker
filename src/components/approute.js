import React from 'react'
import { useAuth } from '../context/userauthcontext'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import Calc from '../pages/Bmilayout'
import Home from '../home'
import Login from '../pages/login'
import Register from '../pages/register'
import { Track } from '../pages/track'
import ForgotPassword from '../pages/forgotpassword'
import Resetpassword from '../pages/resetpassword'
import Loading from '../pages/loading'


export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <ProtectedRoute exact path='/login' component={Login} />
          <ProtectedRoute exact path='/register' component={Register} />
          <ProtectedRoute exact path='/track' component={Track} />
          <ProtectedRoute exact path='/Bmilayout' component={Calc} />
          <ProtectedRoute exact path='/forgotpassword' component={ForgotPassword} />
          <ProtectedRoute exact path='/resetpassword' component={Resetpassword} />
          <ProtectedRoute exact path='/loading' component={Loading} />
        </Switch>
      </Router>
    </>
  )
}



function ProtectedRoute(props) {

  const { currentuser } = useAuth()
  const { path } = props
  const location = useLocation()
  if (
    path === '/login' ||
    path === '/register' ||
    path === '/forgotpassword' ||
    path === '/resetpassword' ||
    path === '/loading'
  ) {
    return currentuser ? (
      <Redirect to={location.state?.from ?? '/'} />
    ) : (
      <Route {...props} />
    )
  }

  return currentuser ? (<Route {...props} />) : (<Redirect
    to={{ pathname: '/loading', state: { from: path }, }} />)
}
