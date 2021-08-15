const Robots = ({ robots, addVote }) => {
  return (
    <div>
      <h3>Robots</h3>
      <ul>
        {robots.map((robot) => (
          <li key={robot.id}>
            <h2>{robot.name}</h2>
            <img src={robot.url} alt={robot.name} />
            <button onClick={() => addVote({ robot: robot.id })}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Robots
