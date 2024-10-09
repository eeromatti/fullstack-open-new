const Course = ({courses}) => {
    return (
      <>
        {courses.map(course => 
          <Content key={course.id} course={course} />
        )}
      </>
    )
  }
  
  const Content = ({course}) => {
    const parts = course.parts
    return (
      <>
        <Header course={course}/>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
        <Total parts={parts}/>
      </>
    )
  }
  
  const Header = ({course}) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  
  const Total = ({parts}) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
      return (
      <p><strong>total of {totalExercises} exercises</strong></p>
    )
  }


export default Course