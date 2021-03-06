import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { Route, Redirect, Switch } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import { url } from './constants'

import Login from './pages/Login'
import Register from './pages/Register'
import Robots from './pages/Robots'
import Results from './pages/Results'
import Nav from './components/Nav'
import Admin from './pages/Admin'
import Loading from './components/Loading'

function App() {
  const [bearerToken, setBearerToken] = useLocalStorage('token', '')
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')
  const [robots, setRobots] = useState([])
  const [votes, setVotes] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  const headers = useMemo(
    () => ({
      'Content-Type': 'application/json',
      'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
      Authorization: `Bearer ${bearerToken}`,
    }),
    [bearerToken]
  )

  const authHeaders = {
    'Content-Type': 'application/json',
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  }

  const logIn = (email, password) => {
    axios
      .post(`${url}/auth/session`, { email, password }, { headers: authHeaders })
      .then((response) => {
        const token = response.data.token
        setBearerToken(token)
      })
      .catch((error) => {
        setLoginError(error.response.statusText)
        setIsLoading(false)
      })
  }

  const register = (name, email, password) => {
    axios
      .post(`${url}/auth/register`, { name, email, password }, { headers: authHeaders })
      .then(() => logIn(email, password))
      .catch((error) => {
        setRegisterError(error.response.statusText)
        setIsLoading(false)
      })
  }

  const logOut = () => {
    axios.delete(`${url}/auth/session`, { headers: headers }).then(() => {
      setBearerToken('')
      setUser(null)
      setIsAdmin(false)
      setLoggingOut(false)
    })
  }

  const addVote = (robotId) => {
    removeUserVoteIfExists()
    axios
      .post(`${url}/votes`, { robot: robotId }, { headers: headers })
      .then((response) => setVotes((prev) => [...prev, response.data]))
      .catch((error) => console.log(error.response.statusText))
  }

  const deleteVotesForRobot = (robotId) => {
    votes.forEach((vote) => {
      if (vote.robot === robotId) {
        axios.delete(`${url}/votes/${vote.id}`, { headers: headers }).catch((err) => console.log(err))
      }
    })
    setVotes((prev) => prev.filter((vote) => vote.robot !== robotId))
  }

  const removeUserVoteIfExists = () => {
    const userVote = votes.find((vote) => vote.user === user.id)
    if (userVote) {
      axios.delete(`${url}/votes/${userVote.id}`, { headers: headers }).then(() => {
        setVotes((prev) => prev.filter((vote) => vote.id !== userVote.id))
      })
    }
  }

  useEffect(() => {
    if (bearerToken) {
      axios
        .get(`${url}/auth/session`, { headers: headers })
        .then((response) => {
          setUser(response.data)
          setIsAdmin(response.data.email === 'admin@mondorobot.com')
          setIsLoading(false)
        })
        .catch((error) => console.log(error))
    } else {
      setIsLoading(false)
    }
  }, [bearerToken, headers])

  useEffect(() => {
    if (user && bearerToken) {
      // get all robots
      axios.get(`${url}/robots`, { headers: headers }).then((response) => setRobots(response.data))

      // get all votes
      axios.get(`${url}/votes`, { headers: headers }).then((response) => setVotes(response.data))
    }
  }, [user, bearerToken, headers])

  if (isLoading) return <Loading />
  if (loggingOut) return <Loading loggingOut={loggingOut} />

  return (
    <>
      {user && <Nav logOut={logOut} isAdmin={isAdmin} setLoggingOut={setLoggingOut} />}
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to="/robots" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {user ? (
            <Redirect to="/robots" />
          ) : (
            <Login logIn={logIn} loginError={loginError} setLoginError={setLoginError} setIsLoading={setIsLoading} />
          )}
        </Route>
        <Route path="/register">
          {user ? (
            <Redirect to="/robots" />
          ) : (
            <Register register={register} registerError={registerError} setRegisterError={setRegisterError} setIsLoading={setIsLoading} />
          )}
        </Route>
        <Route path="/robots">{user ? <Robots robots={robots} addVote={addVote} votes={votes} user={user} /> : <Redirect to="/" />}</Route>
        <Route path="/results">{user ? <Results robots={robots} votes={votes} /> : <Redirect to="/" />}</Route>
        <Route path="/admin">
          {user && isAdmin ? (
            <Admin robots={robots} setRobots={setRobots} bearerToken={bearerToken} deleteVotesForRobot={deleteVotesForRobot} headers={headers} />
          ) : (
            <Redirect to="/" />
          )}
        </Route>
      </Switch>
    </>
  )
}

export default App
