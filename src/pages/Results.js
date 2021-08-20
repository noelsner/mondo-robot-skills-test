import RobotCard from '../components/RobotCard'
import { CSSTransitionGroup } from 'react-transition-group'
import styles from '../styles/Results.module.scss'

const Results = ({ robots, votes }) => {
  return (
    <div className={styles.resultsWrapper}>
      <h3 className={styles.title}>Results</h3>
      <ul className={styles.robotCardContainer}>
        {robots.map((robot) => {
          const votesForRobots = votes.filter((vote) => vote.robot === robot.id)
          const percentage = votes.length <= 0 ? 0 : (votesForRobots.length / votes.length) * 100
          return (
            <RobotCard robot={robot} key={robot.id} parentStyles={styles}>
              <div className={styles.results}>
                <div className={styles.voteCount}>
                  <span className={styles.robotVotes}>{votesForRobots.length}</span>
                  <span className={styles.slash}>/</span>
                  <span className={styles.totalVotes}>{votes.length}</span>
                </div>
                <div className={styles.progressBarContainer}>
                  <CSSTransitionGroup
                    transitionName={{
                      appear: styles.progressAppear,
                      appearActive: styles.progressAppearActive,
                    }}
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnter={false}
                    transitionLeave={false}
                  >
                    <div className={styles.progressBar} style={{ width: percentage + '%' }}></div>
                  </CSSTransitionGroup>
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
