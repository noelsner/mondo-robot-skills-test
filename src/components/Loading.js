import styles from '../styles/Loading.module.scss'

const Loading = ({ loggingOut }) => {
  if (loggingOut) {
    return (
      <div className={styles.loadingLogout}>
        <div className={styles.wave}>
          <span>👋</span>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.loading}>
      <div className={styles.ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
