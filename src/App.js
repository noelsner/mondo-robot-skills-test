import { useState } from 'react'
import axios from 'axios'

function App() {
  const [bearerToken, setBearerToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const getToken = async (email, password) => {
    const credentials = {
      email: email,
      password: password,
    }
    axios
      .post('https://mondo-robot-art-api.herokuapp.com/auth/session', credentials, {
        headers: {
          'Content-Type': 'application/json',
          'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
        },
      })
      .then((response) => {
        setBearerToken(response.data.token)
      })
      .catch((error) => {
        setError(error.response.statusText)
      })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    getToken(email, password)
  }

  return (
    <div className="App">
      <div>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
