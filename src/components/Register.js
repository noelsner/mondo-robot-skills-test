import { useEffect, useState } from 'react'

const Register = ({ register, registerError, setRegisterError }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setRegisterError('')
  }, [email, password, setRegisterError])

  const onSubmit = (e) => {
    e.preventDefault()
    register({ name, email, password })
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="register-name">Full Name</label>
          <input type="text" id="register-name" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="register-email">Email</label>
          <input type="email" id="register-email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
        {registerError && <p>{registerError}</p>}
      </form>
    </div>
  )
}

export default Register
