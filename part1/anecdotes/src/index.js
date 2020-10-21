import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({handleClick, text}) =>
{
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = (props) =>
{
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(6).fill(0))

  const next = () => setSelected(Math.floor(Math.random()*6))
  const vote = () => 
  {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostVotes = Math.max(...points)
  const mostVotesAnecdote = points.indexOf(mostVotes)

  return (
    <div>
      <h2>Anecdotes of the day</h2>
      {props.anecdotes[selected]} <br />
      has {points[selected]} votes <br />
      <Button handleClick={vote} text='vote'/>
      <Button handleClick={next} text='next anecdotes'/>
      <h2>Anecdotes with most votes</h2>
      {props.anecdotes[mostVotesAnecdote]} <br />
      has {mostVotes} votes <br />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)