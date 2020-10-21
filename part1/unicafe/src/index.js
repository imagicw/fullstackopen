import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) =>
{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) =>
{
  const all = good + neutral + bad

  if ( all !== 0)
  {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="average" value={ (good + bad * (-1)) / all } />
          <Statistic text="all" value={ good / all * 100 + '%' } />
        </tbody>
      </table>
    )
  }

  return <div>No feedback given</div>
}

const Button = ({handleClick, text}) =>
{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () =>
{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)