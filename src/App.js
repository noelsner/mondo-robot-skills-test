import { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

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

  const headers = (token) => ({
    headers: {
      'Content-Type': 'application/json',
      'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
      Authorization: `Bearer ${token}`,
    },
  })

  const addRobotHeaders = (token) => ({
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
      Authorization: `Bearer ${token}`,
    },
  })

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
      .then((token) => exchangeTokenForAuth(token))
      .catch((error) => {
        setLoginError(error.response.statusText)
        setIsLoading(false)
      })
  }

  const exchangeTokenForAuth = (token) => {
    axios
      .get(`${url}/auth/session`, headers(token))
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
    axios.delete(`${url}/auth/session`, headers(bearerToken)).then(() => {
      setBearerToken('')
      setLoggedIn(false)
      setUser(null)
      setIsAdmin(false)
      setLoggingOut(false)
    })
  }

  const getRobots = () => {
    axios.get(`${url}/robots`, headers(bearerToken)).then((response) => setRobots(response.data))
  }

  const addRobotConfirmation = () => {
    setAddingRobot(true)
    setTimeout(() => {
      setAddingRobot(false)
    }, 3000)
  }

  const addRobot = (newRobot) => {
    axios
      .post(`${url}/robots`, newRobot, addRobotHeaders(bearerToken))
      .then((response) => {
        setRobots((prev) => [...prev, response.data])
        addRobotConfirmation()
      })
      .catch((error) => console.log(error))
  }

  const removeRobot = (robotId) => {
    axios.delete(`${url}/robots/${robotId}`, headers(bearerToken)).then(() => {
      setRobots((prev) => prev.filter((robot) => robot.id !== robotId))
    })
  }

  const getVotes = () => {
    axios.get(`${url}/votes`, headers(bearerToken)).then((response) => setVotes(response.data))
  }

  const addVote = (robotId) => {
    removeUserVoteIfExists()
    axios
      .post(`${url}/votes`, { robot: robotId }, headers(bearerToken))
      .then((response) => setVotes((prev) => [...prev, response.data]))
      .catch((error) => console.log(error.response.statusText))
  }

  const removeUserVoteIfExists = () => {
    const userVote = votes.find((vote) => vote.user === user.id)
    if (userVote) {
      axios.delete(`${url}/votes/${userVote.id}`, headers(bearerToken)).then(() => {
        setVotes((prev) => prev.filter((vote) => vote.id !== userVote.id))
      })
    }
  }

  useEffect(() => {
    if (loggedIn) {
      getRobots()
      getVotes()
    }
  }, [loggedIn])

  const ProtectedPages = () => (
    <Router>
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
        {isAdmin ? <Admin robots={robots} addRobot={addRobot} removeRobot={removeRobot} addingRobot={addingRobot} /> : <Redirect to="/app/robots" />}
      </Route>
    </Router>
  )

  const AuthPages = () => (
    <Router>
      {isLoading && <Loading />}
      <Route exact path="/">
        <Login logIn={logIn} loginError={loginError} setLoginError={setLoginError} setIsLoading={setIsLoading} />
      </Route>
      <Route path="/register">
        <Register register={register} registerError={registerError} setRegisterError={setRegisterError} setIsLoading={setIsLoading} />
      </Route>
    </Router>
  )

  return (
    <Router>
      {loggingOut && <Loading loggingOut={loggingOut} />}
      <Route exact path="/">
        {loggedIn ? <Redirect to="/app/robots" /> : <AuthPages />}
      </Route>
      <Route path="/app">{loggedIn ? <ProtectedPages /> : <Redirect to="/" />}</Route>
    </Router>
  )
}

export default App
