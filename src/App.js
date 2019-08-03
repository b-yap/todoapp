import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
     todos: [],
     isFetching: true
    };
   // this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount(){
  fetch("https://testreacttodoapp.herokuapp.com/todos")
  .then(response => response.json())
  .then(x => 
    this.setState({
      todos: x,
      isFetching: false
    })
    );
}


  handleSubmit = e => {
    const newTodo = e.target.querySelector("input").value;

    axios.post("https://testreacttodoapp.herokuapp.com/todos",
      {
        title: newTodo
      }
    )
    .then(response => response.data)
    .then(addedTodo => 
      this.setState({
        todos: [
        ...this.state.todos,
        {
          id: this.state.todos.length + 1,
          title: newTodo
        }
      ]

      })
      );

    e.preventDefault();
  }


  handleDelete(id) {
    console.log(id);
    axios.delete("https://testreacttodoapp.herokuapp.com/todos/"+id)
    .then(response => response.data)
    .then (deletedTodo => {
      todo: this.state.todos.filter(todod => todod.id !== id)

    });

  }

  render() {
    return (
      <div>
        <h2>Todo list 3</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="What needs to be done?" />
        </form>
        
          {this.state.isFetching? (
            <p>Fetching todos...</p>)
            : (
            <ul>
            {this.state.todos.map(todo => (
            <li key={todo.id}>{todo.title} 
              <button onClick={this.handleDelete(todo.id)}>x</button>
            </li>
          ))}

            </ul>
            )

        }
        
      </div>
    );
  }
}

export default App;