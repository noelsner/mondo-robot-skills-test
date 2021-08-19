import { useState, useRef } from 'react'
import RobotCard from '../components/RobotCard'
import '../styles/admin.scss'

const Admin = ({ robots, addRobot, removeRobot }) => {
  const [robotName, setRobotName] = useState('')
  const [robotImg, setRobotImg] = useState(null)
  const robotImgRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', robotName)
    formData.append('image', robotImgRef.current.files[0])
    addRobot(formData)
  }

  const handleImage = () => {
    setRobotImg(URL.createObjectURL(robotImgRef.current.files[0]))
  }

  const clearImage = () => {
    setRobotImg(null)
    setRobotName('')
    robotImgRef.current.value = null
  }

  return (
    <div className="admin-wrapper">
      <h3 className="title">Admin</h3>
      <ul className="robot-card-container">
        <li className="robot-card">
          <h2>Add Robot</h2>
          <form onSubmit={onSubmit} className="add-robot-form">
            <div className="text-input">
              <input
                type="text"
                id="new-robot-name"
                name="new-robot-name"
                required
                value={robotName}
                onChange={(e) => setRobotName(e.target.value)}
              />
              <label htmlFor="new-robot-name">Name</label>
            </div>
            <div className="image-upload">
              <div className={`robot-image-preview ${robotImg ? '' : 'hidden'}`}>
                <img src={robotImg} alt={robotName} />
              </div>
              <div className={`${robotImg ? 'hidden' : ''}`}>
                <label htmlFor="new-robot-image">
                  <svg width="21" height="21" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.9999 14.9999V18.9999H2.99992V14.9999H0.333252V18.9999C0.333252 20.4666 1.53325 21.6666 2.99992 21.6666H18.9999C20.4666 21.6666 21.6666 20.4666 21.6666 18.9999V14.9999H18.9999ZM4.33325 6.99992L6.21325 8.87992L9.66658 5.43992V16.3333H12.3333V5.43992L15.7866 8.87992L17.6666 6.99992L10.9999 0.333252L4.33325 6.99992Z"
                      fill="#414242"
                    />
                  </svg>
                  Select Image to Upload
                </label>
                <input type="file" id="new-robot-image" required name="new-robot-image" ref={robotImgRef} onChange={handleImage} />
              </div>
            </div>
            <div className="image-button-container">
              <button type="button" className="clear-button" onClick={clearImage}>
                Clear
              </button>
              <button type="submit" className="button-primary" disabled={!robotImg || !robotName}>
                Add Robot
              </button>
            </div>
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
