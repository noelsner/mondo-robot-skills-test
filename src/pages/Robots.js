import { useState } from 'react'
import RobotCard from '../components/RobotCard'
import Confetti from 'react-dom-confetti'
import styles from '../styles/Robots.module.scss'

const Robots = ({ robots, addVote, votes, user }) => {
  const userVote = votes.find((vote) => vote.user === user.id)
  const [confetti, setConfetti] = useState(false)

  const handleVote = (robot) => {
    addVote(robot.id)
    setConfetti(robot.id)
  }

  return (
    <div className={styles.robotsWrapper}>
      <h3 className={styles.title}>Robots</h3>
      <ul className={styles.robotCardContainer}>
        {robots.map((robot) => {
          return (
            <RobotCard robot={robot} key={robot.id} parentStyles={styles}>
              <button className={styles.buttonPrimary} disabled={userVote?.robot === robot.id} onClick={() => handleVote(robot)}>
                {userVote?.robot === robot.id ? 'Vote Cast' : 'Vote'}
              </button>
              <Confetti active={confetti === robot.id} />
            </RobotCard>
          )
        })}
      </ul>
    </div>
  )
}

export default Robots
