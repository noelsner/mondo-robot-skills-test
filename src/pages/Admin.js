import { useState, useEffect } from 'react'
import RobotCard from '../components/RobotCard'
import styles from '../styles/Admin.module.scss'
import { url } from '../constants'
import axios from 'axios'
import '@github/file-attachment-element'

const Admin = ({ robots, setRobots, bearerToken, deleteVotesForRobot, headers }) => {
  const [robotName, setRobotName] = useState('')
  const [robotImg, setRobotImg] = useState(null)
  const [addingRobot, setAddingRobot] = useState(false)

  useEffect(() => {
    document.addEventListener('file-attachment-accepted', function (event) {
      setRobotImg(event.detail.attachments[0].file)
    })
    return () => {
      document.removeEventListener('file-attachment-accepted', function (event) {
        setRobotImg(event.detail.attachments[0].file)
      })
    }
  }, [])

  const addRobotHeaders = {
    'Content-Type': 'multipart/form-data',
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${bearerToken}`,
  }

  const addRobotConfirmation = () => {
    setAddingRobot(true)
    setTimeout(() => {
      setAddingRobot(false)
    }, 2000)
  }

  const addRobot = (newRobot) => {
    axios
      .post(`${url}/robots`, newRobot, { headers: addRobotHeaders })
      .then((response) => {
        setRobots((prev) => [response.data, ...prev])
        addRobotConfirmation()
        clearForm()
      })
      .catch((error) => console.log(error))
  }

  const removeRobot = (robotId) => {
    axios.delete(`${url}/robots/${robotId}`, { headers: headers }).then(() => {
      setRobots((prev) => prev.filter((robot) => robot.id !== robotId))
      deleteVotesForRobot(robotId)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setAddingRobot('adding')
    const formData = new FormData()
    formData.append('name', robotName)
    formData.append('image', robotImg)
    addRobot(formData)
  }

  const handleNameChange = (e) => {
    setRobotName(e.target.value)
  }

  const clearForm = () => {
    setRobotImg(null)
    setRobotName('')
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
      <h3 className={styles.title}>Admin</h3>
      <ul className={styles.robotCardContainer}>
        <li className={styles.robotCard}>
          <h2>Add Robot</h2>
          <form onSubmit={onSubmit} className={styles.addRobotForm}>
            <div className={styles.textInput}>
              <input type="text" id="new-robot-name" name="new-robot-name" required value={robotName} onChange={handleNameChange} />
              <label htmlFor="new-robot-name">Name</label>
            </div>
            <file-attachment input="new-robot-image" directory>
              <div className={styles.imageUpload}>
                {robotImg ? (
                  <div className={styles.robotImagePreview}>
                    <img src={robotImg ? URL.createObjectURL(robotImg) : ''} alt={robotName} />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="new-robot-image">
                      <svg width="21" height="21" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18.9999 14.9999V18.9999H2.99992V14.9999H0.333252V18.9999C0.333252 20.4666 1.53325 21.6666 2.99992 21.6666H18.9999C20.4666 21.6666 21.6666 20.4666 21.6666 18.9999V14.9999H18.9999ZM4.33325 6.99992L6.21325 8.87992L9.66658 5.43992V16.3333H12.3333V5.43992L15.7866 8.87992L17.6666 6.99992L10.9999 0.333252L4.33325 6.99992Z"
                          fill="#414242"
                        />
                      </svg>
                      Select Image to Upload
                    </label>
                    <input type="file" id="new-robot-image" required name="new-robot-image" />
                  </div>
                )}
              </div>
            </file-attachment>
            <div className={styles.imageButtonContainer}>
              <button type="button" className={styles.clearButton} onClick={clearForm}>
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
