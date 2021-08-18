import { useState, useRef } from 'react'
import RobotCard from './RobotCard'
import '../styles/admin.scss'

const Admin = ({ robots, addRobot, removeRobot }) => {
  const [robotName, setRobotName] = useState('')
  const [robotImg, setRobotImg] = useState({})

  const robotImgRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', robotName)
    formData.append('image', robotImgRef.current.files[0])
    addRobot(formData)
  }

  const handleImage = () => {
    setRobotImg({
      file: robotImgRef.current.files[0],
      image: URL.createObjectURL(robotImgRef.current.files[0]),
    })
  }

  return (
    <div className="admin-wrapper">
      <h3 className="title">Admin</h3>
      <ul className="robot-card-container">
        <li className="robot-card">
          <h2>Add Robot</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="new-robot-name">Robot Name</label>
              <input type="text" id="new-robot-name" name="new-robot-name" value={robotName} onChange={(e) => setRobotName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="new-robot-image">Robot Image</label>
              <input type="file" id="new-robot-image" name="new-robot-image" ref={robotImgRef} onChange={handleImage} />
            </div>
            <button type="submit" className="button-primary">
              Add Robot
            </button>
          </form>
        </li>
        {robots.map((robot) => (
          <RobotCard robot={robot} key={robot.id}>
            <div className="button-container">
              <button className="button-primary" onClick={() => alert('Sorry, the edit function is currently unavailable')}>
                Edit
              </button>
              <button className="button-secondary" onClick={() => removeRobot(robot.id)}>
                Delete
              </button>
            </div>
          </RobotCard>
        ))}
      </ul>
    </div>
  )
}

export default Admin
