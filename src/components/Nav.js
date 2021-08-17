import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/nav.scss'

const Nav = ({ logOut, isAdmin }) => {
  // const [onCurrentPage, setOnCurrentPage] = useState(false)
  const navMenu = useRef()
  const hamburger = useRef()
  const header = useRef()

  const location = useLocation()
  const onCurrentPage = (pathName) => (location.pathname.replace('/app/', '') === pathName ? 'current' : '')

  const handleHamburgerClick = () => {
    navMenu.current.classList.toggle('active')
    hamburger.current.classList.toggle('active')
    header.current.classList.toggle('active')
  }

  const closeMenu = () => {
    navMenu.current.classList.remove('active')
    hamburger.current.classList.remove('active')
    header.current.classList.remove('active')
  }

  return (
    <header className="header" ref={header}>
      <nav className="navbar">
        <Link to="/app/robots" className="nav-logo">
          <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        </Link>
        <div className="nav-menu" ref={navMenu}>
          <ul>
            <li>
              <Link to="/app/robots" className={`${onCurrentPage('robots')}`} onClick={closeMenu}>
                Robots
              </Link>
            </li>
            <li>
              <Link to="/app/results" className={`${onCurrentPage('results')}`} onClick={closeMenu}>
                Results
              </Link>
            </li>
          </ul>
          <ul>
            {isAdmin ? (
              <li className="secondary-link">
                <Link to="/app/admin" className={`${onCurrentPage('admin')}`} onClick={closeMenu}>
                  Admin
                </Link>
              </li>
            ) : null}
            <li className="secondary-link">
              <Link
                to="/"
                onClick={() => {
                  closeMenu()
                  logOut()
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <button className="hamburger" ref={hamburger} onClick={handleHamburgerClick}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>
    </header>
  )
}

export default Nav
