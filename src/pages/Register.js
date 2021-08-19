import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.scss'

const Register = ({ register, registerError, setRegisterError, setIsLoading }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setRegisterError('')
    register(name, email, password)
  }
  console.log('registerError :>> ', registerError)

  return (
    <div className="container">
      <div className="login-card">
        <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        <form onSubmit={onSubmit}>
          <div className="input-container">
            <div className="text-input">
              <input type="text" id="register-name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="register-name">Full Name</label>
            </div>
          </div>
          <div className="input-container">
            <div className="text-input">
              <input type="email" id="register-email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="register-email">Email</label>
            </div>
          </div>
          <div className="input-container">
            <div className="text-input">
              <input type="password" id="register-password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="register-password">Password</label>
            </div>
          </div>
          {registerError && <p className="error-message">{registerError}</p>}
          <button type="submit" className="button-primary">
            Register
          </button>
        </form>
        <Link to="/" className="button-secondary">
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default Register
