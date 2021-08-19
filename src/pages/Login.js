import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Login.module.scss'

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
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        <form onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.textInput}>
              <input type="email" id="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.textInput}>
              <input type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          {loginError && <p className={styles.errorMessage}>{loginError}</p>}
          <button type="submit" className={styles.buttonPrimary}>
            Log in
          </button>
        </form>
        <Link to="/register" className={styles.buttonSecondary}>
          Register
        </Link>
      </div>
    </div>
  )
}

export default Login
