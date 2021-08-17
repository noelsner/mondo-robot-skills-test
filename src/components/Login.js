import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.scss'

const Login = ({ logIn, loginError, setLoginError }) => {
  const [email, setEmail] = useState('admin@mondorobot.com')
  const [password, setPassword] = useState('R0bot4Lif3')

  const onSubmit = (e) => {
    e.preventDefault()
    setLoginError('')
    logIn(email, password)
  }

  return (
    <div className="container">
      <div className="login-card">
        <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        <form onSubmit={onSubmit}>
          <div className="text-input">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="text-input">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {loginError && <p className="error-message">{loginError}</p>}
          <button type="submit" className="button-primary">
            Log in
          </button>
        </form>
        <Link to="/register" className="button-secondary">
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
