import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StaticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}:</td><td>{value}</td>
    </tr>
  )
  
}

const Statistics = ({good, neutral, bad}) => {
  const allClicks = good + neutral + bad
  const score = good - bad
  const average = allClicks === 0 ? 0 : score / allClicks
  const positivePercentage = allClicks === 0 ? 0 : (good / allClicks) * 100 + '%'

  if (allClicks === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StaticLine text={"good"} value={good} />
        <StaticLine text={"neutral"} value={neutral} />
        <StaticLine text={"bad"} value={bad} />
        <StaticLine text={"all"} value={allClicks} />
        <StaticLine text={"average"} value={average} />
        <StaticLine text={"positive"} value={positivePercentage} />
      </table>
    </div>
  )
}

const App = () => {

const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)


const handleGoodClick = () => setGood(good + 1)
const handleNeutralClick = () => setNeutral(neutral + 1)
const handleBadClick = () => setBad(bad + 1)


return (
  <div>
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
    </div>
    <Statistics good={good} neutral={neutral} bad={bad} />
  </div>
  )
}
export default App