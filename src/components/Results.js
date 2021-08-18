import '../styles/results.scss'
import RobotCard from './RobotCard'

const Results = ({ robots, votes }) => {
  return (
    <div className="results-wrapper">
      <h3 className="title">Results</h3>
      <ul className="robot-card-container">
        {robots.map((robot) => {
          const votesForRobots = votes.filter((vote) => vote.robot === robot.id)
          const percentage = (votesForRobots.length / votes.length) * 100 + '%'
          return (
            <RobotCard robot={robot} key={robot.id}>
              <div className="results">
                <div className="vote-count">
                  <span className="robot-votes">{votesForRobots.length}</span>
                  <span className="slash">/</span>
                  <span className="total-votes">{votes.length}</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: percentage }}></div>
                </div>
              </div>
            </RobotCard>
          )
        })}
      </ul>
    </div>
  )
}

export default Results
