import { useState, useRef } from 'react'

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
    <div>
      <h3>Admin</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="new-robot-name">Robot Name</label>
          <input type="text" id="new-robot-name" name="new-robot-name" value={robotName} onChange={(e) => setRobotName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="new-robot-image">Robot Image</label>
          <input type="file" id="new-robot-image" name="new-robot-image" ref={robotImgRef} onChange={handleImage} />
        </div>
        <button type="submit">Add Robot</button>
      </form>
      <ul>
        {robots.map((robot) => (
          <li key={robot.id}>
            <h2>{robot.name}</h2>
            <img src={robot.url} alt={robot.name} />
            <button onClick={() => removeRobot(robot.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Admin
