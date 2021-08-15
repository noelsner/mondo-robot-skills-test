import { useEffect, useState } from 'react'
import axios from 'axios'
import Login from './components/Login'
import Register from './components/Register'
import Robots from './components/Robots'

const url = 'https://mondo-robot-art-api.herokuapp.com'

function App() {
  const [bearerToken, setBearerToken] = useState('')
  const [auth, setAuth] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [robots, setRobots] = useState([])

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
    setAuth(response.data)
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
    if (auth) {
      getRobots()
    }
  }, [auth])

  if (!auth) {
    return (
      <div>
        <h1>Login</h1>
        <Login login={login} loginError={loginError} setLoginError={setLoginError} />
        <hr />
        <h1>Register</h1>
        <Register register={register} registerError={registerError} setRegisterError={setRegisterError} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>Welcome {auth.name}</h1>
        <Robots robots={robots} />
      </div>
    )
  }
}

export default App
