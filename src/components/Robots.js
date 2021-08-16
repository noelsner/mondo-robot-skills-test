const Robots = ({ robots, addVote }) => {
  return (
    <div>
      <h3>Robots</h3>
      <ul>
        {robots.map((robot) => (
          <li key={robot.id}>
            <h2>{robot.name}</h2>
            <img src={robot.url} alt={robot.name} />
            {/* K: the addVote function would be more intuitive if it just took the robot directly i.e. addVote(robot)
            or just the id i.e.
            addVote(robotId)
            the function should handle formatting it into the object that the api wants, instead of having to remember that format
            every time you call it */}
            <button onClick={() => addVote(robot.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Robots
