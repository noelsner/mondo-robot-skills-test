import { useState } from 'react'
import RobotCard from '../components/RobotCard'
import Confetti from 'react-dom-confetti'
import '../styles/robots.scss'

const Robots = ({ robots, addVote, votes, user }) => {
  const userVote = votes.find((vote) => vote.user === user.id)
  const [confetti, setConfetti] = useState(false)

  const handleVote = (robot) => {
    addVote(robot.id)
    setConfetti(robot.id)
  }

  return (
    <div className="robots-wrapper">
      <h3 className="title">Robots</h3>
      <ul className="robot-card-container">
        {robots.map((robot) => {
          return (
            <RobotCard robot={robot} key={robot.id}>
              <button className="button-primary" disabled={userVote?.robot === robot.id} onClick={() => handleVote(robot)}>
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
