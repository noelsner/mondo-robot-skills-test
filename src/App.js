import { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Redirect, useLocation } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Robots from './pages/Robots'
import Results from './pages/Results'
import Nav from './components/Nav'
import Admin from './pages/Admin'
import Loading from './components/Loading'

const url = 'https://mondo-robot-art-api.herokuapp.com'

function App() {
  const [bearerToken, setBearerToken] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [robots, setRobots] = useState([])
  const [votes, setVotes] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [addingRobot, setAddingRobot] = useState(false)
  const [params, setParams] = useState()

  let location = useLocation()

  const headers = () => {
    const token = window.localStorage.getItem('token')
    return {
      headers: {
        'Content-Type': 'application/json',
        'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  }

  const addRobotHeaders = () => {
    const token = window.localStorage.getItem('token')
    return {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  }

  const authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    },
  }

  const logIn = (email, password) => {
    axios
      .post(`${url}/auth/session`, { email, password }, authHeaders)
      .then((response) => {
        const token = response.data.token
        setBearerToken(token)
        return token
      })
      .then((token) => {
        window.localStorage.setItem('token', token)
        exchangeTokenForAuth()
      })
      .catch((error) => {
        setLoginError(error.response.statusText)
        setIsLoading(false)
      })
  }

  const exchangeTokenForAuth = () => {
    axios
      .get(`${url}/auth/session`, headers())
      .then((response) => {
        setUser(response.data)
        setLoggedIn(true)
        response.data.email === 'admin@mondorobot.com' ? setIsAdmin(true) : setIsAdmin(false)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }

  const register = (name, email, password) => {
    axios
      .post(`${url}/auth/register`, { name, email, password }, authHeaders)
      .then(() => logIn(email, password))
      .catch((error) => {
        setRegisterError(error.response.statusText)
        setIsLoading(false)
      })
  }

  const logOut = () => {
    axios.delete(`${url}/auth/session`, headers()).then(() => {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('params')
      setBearerToken('')
      setLoggedIn(false)
      setUser(null)
      setIsAdmin(false)
      setLoggingOut(false)
    })
  }

  const addRobotConfirmation = () => {
    setAddingRobot(true)
    setTimeout(() => {
      setAddingRobot(false)
    }, 2000)
  }

  const addRobot = (newRobot) => {
    axios
      .post(`${url}/robots`, newRobot, addRobotHeaders())
      .then((response) => {
        setRobots((prev) => [...prev, response.data])
        addRobotConfirmation()
        window.localStorage.removeItem('robotName')
      })
      .catch((error) => console.log(error))
  }

  const removeRobot = (robotId) => {
    axios.delete(`${url}/robots/${robotId}`, headers()).then(() => {
      setRobots((prev) => prev.filter((robot) => robot.id !== robotId))
    })
  }

  const addVote = (robotId) => {
    removeUserVoteIfExists()
    axios
      .post(`${url}/votes`, { robot: robotId }, headers())
      .then((response) => setVotes((prev) => [...prev, response.data]))
      .catch((error) => console.log(error.response.statusText))
  }

  const removeUserVoteIfExists = () => {
    const userVote = votes.find((vote) => vote.user === user.id)
    if (userVote) {
      axios.delete(`${url}/votes/${userVote.id}`, headers()).then(() => {
        setVotes((prev) => prev.filter((vote) => vote.id !== userVote.id))
      })
    }
  }

  useEffect(() => {
    axios
      .get(`${url}/auth/session`, headers())
      .then((response) => {
        setUser(response.data)
        setLoggedIn(true)
        response.data.email === 'admin@mondorobot.com' ? setIsAdmin(true) : setIsAdmin(false)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))

    setParams(window.localStorage.getItem('params'))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('params', location.pathname)
  }, [location])

  useEffect(() => {
    if (loggedIn) {
      axios.get(`${url}/robots`, headers()).then((response) => setRobots(response.data))
      axios.get(`${url}/votes`, headers()).then((response) => setVotes(response.data))
      setParams(window.localStorage.getItem('params'))
    }
  }, [loggedIn, bearerToken])

  const ProtectedPages = () => (
    <>
      <Route path="/app">
        <Nav logOut={logOut} isAdmin={isAdmin} setLoggingOut={setLoggingOut} />
      </Route>
      <Route path="/app/robots">
        <Robots robots={robots} addVote={addVote} votes={votes} user={user} />
      </Route>
      <Route path="/app/results">
        <Results robots={robots} votes={votes} />
      </Route>
      <Route path="/app/admin">
        {isAdmin && <Admin robots={robots} addRobot={addRobot} removeRobot={removeRobot} addingRobot={addingRobot} setAddingRobot={setAddingRobot} />}
      </Route>
    </>
  )

  const AuthPages = () => (
    <>
      {isLoading && <Loading />}
      <Route exact path="/">
        <Login logIn={logIn} loginError={loginError} setLoginError={setLoginError} setIsLoading={setIsLoading} />
      </Route>
      <Route path="/register">
        <Register register={register} registerError={registerError} setRegisterError={setRegisterError} setIsLoading={setIsLoading} />
      </Route>
    </>
  )

  return (
    <>
      {loggingOut && <Loading loggingOut={loggingOut} />}
      <Route exact path="/">
        {loggedIn ? <Redirect to={params ? params : '/app/robots'} /> : <AuthPages />}
      </Route>
      <Route path="/app">{loggedIn ? <ProtectedPages /> : <Redirect to="/" />}</Route>
    </>
  )
}

export default App
