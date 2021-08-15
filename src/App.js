import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Robots from './components/Robots'

const url = 'https://mondo-robot-art-api.herokuapp.com'

function App() {
  const [bearerToken, setBearerToken] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [robots, setRobots] = useState([])

  console.log('bearerToken :>> ', bearerToken)

  const headers = (token) => ({
    headers: {
      'Content-Type': 'application/json',
      'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
      Authorization: `Bearer ${token}`,
    },
  })

  const login = async (credentials) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
      },
    }
    await axios
      .post(`${url}/auth/session`, credentials, headers)
      .then((response) => {
        const token = response.data.token
        setBearerToken(token)
        return token
      })
      .then((token) => {
        exchangeTokenForAuth(token)
      })
      .catch((error) => {
        setLoginError(error.response.statusText)
      })
  }

  const exchangeTokenForAuth = async (token) => {
    const response = await axios.get(`${url}/auth/session`, headers(token))
    setUser(response.data)
    setLoggedIn(true)
  }

  const register = async (credentials) => {
    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
      },
    }
    const { email, password } = credentials
    await axios
      .post(`${url}/auth/register`, credentials, headers)
      .then((response) => {
        login({ email, password })
      })
      .catch((error) => {
        setRegisterError(error.response.statusText)
      })
  }

  const logout = async () => {
    await axios.delete(`${url}/auth/session`, headers(bearerToken)).then(() => {
      setBearerToken('')
      setLoggedIn(false)
      setUser(null)
      return <Redirect to="/login" />
    })
  }

  const getRobots = async () => {
    const robots = await axios.get(`${url}/robots`, headers(bearerToken))
    setRobots(robots.data)
  }

  // robot object should contain a name (string) and an image (string)
  const addRobot = async (robot) => {
    await axios
      .post(`${url}/robots`, robot, headers(bearerToken))
      .then((response) => alert('Robot Added'))
      .catch((error) => alert(error.response.statusText))
  }

  useEffect(() => {
    if (loggedIn) {
      getRobots()
    }
  }, [loggedIn])

  const NavBar = () => (
    <div>
      <Link to="/robots">Robots</Link>
      <Link to="/results">Results</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )

  const Nav = ({ children }) => (
    <div>
      <NavBar />
      {children}
    </div>
  )

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/robots" /> : <Login login={login} loginError={loginError} setLoginError={setLoginError} />}
          </Route>
          <Route exact path="/register">
            <Register register={register} registerError={registerError} setRegisterError={setRegisterError} />
          </Route>
          <Route exact path="/robots">
            {loggedIn ? (
              <Nav>
                <Robots robots={robots} />
              </Nav>
            ) : (
              <Redirect to="/" />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
