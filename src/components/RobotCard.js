const RobotCard = ({ robot, children, parentStyles }) => {
  return (
    <li key={robot.id} className={parentStyles.robotCard}>
      <h2>{robot.name}</h2>
      <div className={parentStyles.imageContainer}>
        <img src={robot.url} alt={robot.name} />
      </div>
      {children}
    </li>
  )
}

export default RobotCard
