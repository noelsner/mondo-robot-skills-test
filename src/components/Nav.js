import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from '../styles/Nav.module.scss'

const Nav = ({ logOut, isAdmin, setLoggingOut }) => {
  const navMenu = useRef()
  const hamburger = useRef()
  const header = useRef()

  const location = useLocation()
  const onCurrentPage = (pathName) => (location.pathname.replace('/app/', '') === pathName ? styles.current : '')

  const handleHamburgerClick = () => {
    navMenu.current.classList.toggle(styles.active)
    hamburger.current.classList.toggle(styles.active)
    header.current.classList.toggle(styles.active)
  }

  const closeMenu = () => {
    window.scrollTo(0, 0)
    navMenu.current.classList.remove(styles.active)
    hamburger.current.classList.remove(styles.active)
    header.current.classList.remove(styles.active)
  }

  return (
    <header className={styles.header} ref={header}>
      <nav className={styles.navbar}>
        <Link to="/app/robots" className={styles.navLogo}>
          <img src="/assets/MondoRobotLogo.png" alt="Mondo Robot Logo" />
        </Link>
        <div className={styles.navMenu} ref={navMenu}>
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
              <li className={styles.secondaryLink}>
                <Link to="/app/admin" className={`${onCurrentPage('admin')}`} onClick={closeMenu}>
                  Admin
                </Link>
              </li>
            ) : null}
            <li className={styles.secondaryLink}>
              <Link
                to="/"
                onClick={() => {
                  closeMenu()
                  logOut()
                  setLoggingOut(true)
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
        <button className={styles.hamburger} ref={hamburger} onClick={handleHamburgerClick}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </nav>
    </header>
  )
}

export default Nav
