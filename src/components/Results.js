const Results = ({ robots, votes }) => {
  return (
    <div>
      <h3>Results</h3>
      <ul>
        {robots.map((robot) => {
          const votesForRobots = votes.filter((vote) => vote.robot === robot.id)
          return (
            <li key={robot.id}>
              <h2>{robot.name}</h2>
              <img src={robot.url} alt={robot.name} />
              <p>
                {votesForRobots.length} / {votes.length}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Results
