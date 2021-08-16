import { useState, useRef } from 'react'

const Admin = ({ robots, addRobot, deleteRobot }) => {
  const [robotName, setRobotName] = useState('')
  const [robotImg, setRobotImg] = useState({})

  const robotImgRef = useRef()

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('in submit', robotImgRef.current.files[0])
    setRobotImg(URL.createObjectURL(robotImgRef.current.files[0]))
    addRobot(robotName, robotImg.file)
  }

  const handleImage = () => {
    setRobotImg({
      file: robotImgRef.current.files[0],
      image: URL.createObjectURL(robotImgRef.current.files[0]),
    })
  }

  // console.log(robots[0].url)
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
      {robotImg ? <img src={robotImg} alt="" /> : ''}
      <ul>
        {robots.map((robot) => (
          <li key={robot.id}>
            <h2>{robot.name}</h2>
            <img src={robot.url} alt={robot.name} />
            {/* <button onClick={() => addVote(robot.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Admin
