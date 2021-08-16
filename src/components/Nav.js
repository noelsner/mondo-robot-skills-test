import { Link } from 'react-router-dom'

const Nav = ({ logOut }) => {
  return (
    <div>
      <Link to="/app/robots">Robots</Link>
      <Link to="/app/results">Results</Link>
      <button onClick={logOut}>Logout</button>
    </div>
  )
}

export default Nav
