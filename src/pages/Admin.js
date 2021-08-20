import { useState, useRef } from 'react'
import RobotCard from '../components/RobotCard'
import styles from '../styles/Admin.module.scss'

const Admin = ({ robots, addRobot, removeRobot, addingRobot, setAddingRobot }) => {
  const [robotName, setRobotName] = useState('')
  const [robotImg, setRobotImg] = useState(null)
  const robotImgRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    setAddingRobot('adding')
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

  const Confirmation = () => {
    return (
      <div className={styles.addedRobotConfirmation}>
        <div>
          Robot Added
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78 78">
            <g fill="currentColor" fillRule="evenodd">
              <path d="M38.98 77.808C17.68 77.808.35 60.48.35 39.18S17.68.551 38.98.551c21.299 0 38.627 17.33 38.627 38.63 0 21.299-17.328 38.627-38.627 38.627zm0-71.955c-18.377 0-33.328 14.951-33.328 33.327 0 18.377 14.95 33.327 33.328 33.327 18.376 0 33.326-14.95 33.326-33.327 0-18.376-14.95-33.327-33.326-33.327z" />
              <path d="M33.738 51.963a2.65 2.65 0 01-1.875-.776l-9.781-9.782a2.65 2.65 0 113.747-3.748l7.909 7.907 18.39-18.39a2.65 2.65 0 113.748 3.747L35.611 51.187a2.65 2.65 0 01-1.873.776" />
            </g>
          </svg>
        </div>
      </div>
    )
  }

  const AddingRobot = () => (
    <div className={styles.ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

  const ConfirmAdded = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <path d="M58.395 32.156L42.995 50.625l-5.39-6.463a5.995 5.995 0 10-9.212 7.676l9.997 12a5.991 5.991 0 009.21.006l20.005-24a5.999 5.999 0 10-9.211-7.688z" />
      <path d="M48 0a48 48 0 1048 48A48.051 48.051 0 0048 0zm0 84a36 36 0 1136-36 36.04 36.04 0 01-36 36z" />
    </svg>
  )

  return (
    <div className={styles.adminWrapper}>
      {/* {addingRobot && <Confirmation />} */}
      <h3 className={styles.title}>Admin</h3>
      <ul className={styles.robotCardContainer}>
        <li className={styles.robotCard}>
          <h2>Add Robot</h2>
          <form onSubmit={onSubmit} className={styles.addRobotForm}>
            <div className={styles.textInput}>
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
            <div className={styles.imageUpload}>
              <div className={`${styles.robotImagePreview} ${robotImg ? '' : styles.hidden}`}>
                <img src={robotImg} alt={robotName} />
              </div>
              <div className={`${robotImg ? styles.hidden : ''}`}>
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
            <div className={styles.imageButtonContainer}>
              <button type="button" className={styles.clearButton} onClick={clearImage}>
                Clear
              </button>
              <button type="submit" className={styles.buttonPrimary} disabled={!addingRobot && (!robotImg || !robotName)}>
                {addingRobot === 'adding' && <AddingRobot />}
                {addingRobot === true && <ConfirmAdded />}
                {!addingRobot && 'Add Robot'}
              </button>
            </div>
          </form>
        </li>
        {robots.map((robot) => (
          <RobotCard robot={robot} key={robot.id} parentStyles={styles}>
            <div className={styles.buttonContainer}>
              <button className={styles.buttonPrimary} onClick={() => alert('Sorry, the edit function is currently unavailable')}>
                Edit
              </button>
              <button className={styles.buttonSecondary} onClick={() => removeRobot(robot.id)}>
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
