import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.scss'

const Register = ({ register, registerError, setRegisterError }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setRegisterError('')
  }, [email, password, setRegisterError])

  const onSubmit = (e) => {
    e.preventDefault()
    register(name, email, password)
  }

  return (
    <div className="container">
      <div className="login-card">
        <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        <form onSubmit={onSubmit}>
          <div className="text-input">
            <label htmlFor="register-name">Full Name</label>
            <input type="text" id="register-name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="text-input">
            <label htmlFor="register-email">Email</label>
            <input type="email" id="register-email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="text-input">
            <label htmlFor="register-password">Password</label>
            <input type="password" id="register-password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="button-primary">
            Register
          </button>
          {registerError && <p>{registerError}</p>}
        </form>
        <Link to="/" className="button-secondary">
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default Register
