import { Link } from 'react-router-dom'

const Nav = ({ logOut, isAdmin }) => {
  return (
    <div>
      <Link to="/app/robots">Robots</Link>
      <Link to="/app/results">Results</Link>
      {isAdmin ? <Link to="/app/admin">Admin</Link> : null}
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Nav
