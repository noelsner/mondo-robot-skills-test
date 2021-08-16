import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = ({ logIn, loginError, setLoginError }) => {
  const [email, setEmail] = useState('admin@mondorobot.com')
  const [password, setPassword] = useState('R0bot4Lif3')

  useEffect(() => {
    setLoginError('')
  }, [email, password, setLoginError])

  const onSubmit = (e) => {
    e.preventDefault()
    logIn(email, password)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        {loginError && <p>{loginError}</p>}
      </form>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default Login
