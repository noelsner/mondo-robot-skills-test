import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/Login.module.scss'

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

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        <form onSubmit={onSubmit}>
          <div className={styles.inputContainer}>
            <div className={styles.textInput}>
              <input type="text" id="register-name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />
              <label htmlFor="register-name">Full Name</label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.textInput}>
              <input type="email" id="register-email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="register-email">Email</label>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.textInput}>
              <input type="password" id="register-password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="register-password">Password</label>
            </div>
          </div>
          {registerError && <p className={styles.errorMessage}>{registerError}</p>}
          <button type="submit" className={styles.buttonPrimary}>
            Register
          </button>
        </form>
        <Link to="/" className={styles.buttonSecondary}>
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default Register
