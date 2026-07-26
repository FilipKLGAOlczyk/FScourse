import { useState } from "react"

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {

const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)


const handleGoodClick = () => setGood(good + 1)
const handleNeutralClick = () => setNeutral(neutral + 1)
const handleBadClick = () => setBad(bad + 1)


const allClicks = good + neutral + bad
const score = good - bad
const average = allClicks === 0 ? 0 : score / allClicks
const positivePercentage = allClicks === 0 ? 0 : (good / allClicks) * 100

return (
  <div>
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
    </div>
    <div>
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {allClicks}</p>
      <p>average: {average}</p>
      <p>positive: {positivePercentage}%</p>
    </div>
  </div>
  
)
}
export default App