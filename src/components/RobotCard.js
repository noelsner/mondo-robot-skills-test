import '../styles/robots.scss'

const RobotCard = ({ robot, children }) => {
  return (
    <li key={robot.id} className="robot-card">
      <h2>{robot.name}</h2>
      <div className="image-container">
        <img src={robot.url} alt={robot.name} />
      </div>
      {children}
    </li>
  )
}

export default RobotCard
