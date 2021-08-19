import styles from '../styles/Results.module.scss'
import RobotCard from '../components/RobotCard'

const Results = ({ robots, votes }) => {
  return (
    <div className={styles.resultsWrapper}>
      <h3 className={styles.title}>Results</h3>
      <ul className={styles.robotCardContainer}>
        {robots.map((robot) => {
          const votesForRobots = votes.filter((vote) => vote.robot === robot.id)
          const percentage = (votesForRobots.length / votes.length) * 100 + '%'
          return (
            <RobotCard robot={robot} key={robot.id} parentStyles={styles}>
              <div className={styles.results}>
                <div className={styles.voteCount}>
                  <span className={styles.robotVotes}>{votesForRobots.length}</span>
                  <span className={styles.slash}>/</span>
                  <span className={styles.totalVotes}>{votes.length}</span>
                </div>
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBar} style={{ width: percentage }}></div>
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
