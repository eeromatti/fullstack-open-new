import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const initialVotes = {};
  anecdotes.forEach((_, index) => {
    initialVotes[index] = 0;
  });

  const [votes, setVotes] = useState(initialVotes);
  const [selected, setSelected] = useState(0);
  const [maxVote, setMaxVote] = useState(null);

  const handleRandomAnecdote = () => {
    const min = 0;
    const max = anecdotes.length - 1;
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    setSelected(randomInt);
  };

  const voteAnecdote = () => {
    const copy = { ...votes };
    copy[selected] += 1;
    setVotes(copy);

    // Päivitetään eniten ääniä saanut anekdootti
    let max_value = 0;
    let max_value_index = null;

    for (const [key, value] of Object.entries(copy)) {
      if (value > max_value) {
        max_value = value;
        max_value_index = parseInt(key, 10);
      }
    }
    setMaxVote(max_value_index);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteAnecdote}>vote</button>
      <button onClick={handleRandomAnecdote}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      {maxVote !== null ? (
        <p>
          {anecdotes[maxVote]}<br />
          has {votes[maxVote]} votes
        </p>
      ) : (
        <p>No votes yet.</p>
      )}
    </div>
  );
};

export default App;