import RobotCard from './RobotCard'
import '../styles/robots.scss'

const Robots = ({ robots, addVote, userVotes }) => {
  return (
    <div className="robots-wrapper">
      <h3 className="title">Robots</h3>
      <ul className="robot-card-container">
        {robots.map((robot) => {
          const votedForRobot = userVotes[0]?.robot === robot.id
          return (
            <RobotCard robot={robot} key={robot.id}>
              <button className="button-primary" disabled={votedForRobot} onClick={() => addVote(robot.id)}>
                {votedForRobot ? 'Vote Cast' : 'Vote'}
              </button>
            </RobotCard>
          )
        })}
      </ul>
    </div>
  )
}

export default Robots
