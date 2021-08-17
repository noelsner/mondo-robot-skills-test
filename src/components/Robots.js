import RobotCard from './RobotCard'
import '../styles/robots.scss'

const Robots = ({ robots, addVote }) => {
  return (
    <div>
      <div className="wrapper">
        <h3 className="title">Robots</h3>
        <ul className="robot-card-container">
          {robots.map((robot) => (
            <RobotCard robot={robot}>
              <button className="button-primary" onClick={() => addVote(robot.id)}>
                Vote
              </button>
            </RobotCard>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Robots
