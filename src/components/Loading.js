import '../styles/loading.scss'

const Loading = ({ loggingOut }) => {
  if (loggingOut) {
    return (
      <div className="loading-logout">
        <div className="wave">
          <span>👋</span>
        </div>
      </div>
    )
  }
  return (
    <div className="loading">
      <div className="ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
