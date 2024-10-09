import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
  {props.text}
  </button>
  )
}

const StatisticLine = (props) => {
  return (
    <div>
        {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  console.log(props)
  if (props.good + props.neutral + props.bad > 0) {
    return (
      <div>
        <h1>statistics</h1>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.good + props.neutral + props.bad} />
          <StatisticLine text="average" value={(props.good - props.bad)/(props.good + props.neutral + props.bad)} />
          <StatisticLine text="positive" value={props.good / (props.good + props.neutral + props.bad) * 100} />
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {() => setGood(good + 1)} text="good" />
      <Button handleClick = {() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick = {() => setBad(bad + 1)} text="bad" />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App

