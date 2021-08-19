import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.scss'

const Login = ({ logIn, loginError, setLoginError, setIsLoading }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')
    logIn(email, password)
  }

  return (
    <div className="container">
      <div className="login-card">
        <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        <form onSubmit={onSubmit}>
          <div className="input-container">
            <div className="text-input">
              <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="input-container">
            <div className="text-input">
              <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>
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
