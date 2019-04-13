import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Todos from './components/Todos'; //importing components
import Header from './components/layout/Header';
import Add from './components/Add';
import uuid from 'uuid'; //helps generate a random ID
import About from './components/pages/About'; //helps generate a random ID
import axios from 'axios';

class App extends Component {
  state={
    todos: []
  }
    /*
    [
      {
        id: uuid.v4(),
        title: 'Take out trash',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'clean bathroom',
        completed: false
      },
      {
        id: uuid.v4(),
        title: 'meeting',
        completed: true
      }
    ]
    */

  componentDidMount(){ //get request to the server
    axios.get('https://jsonplaceholder.typicode.com/todos?limit=10')
    .then(res => this.setState({ todos: res.data })) //set todos to response data from the JSON placeholder
  }
 

  //toggle complete 
  markComplete =(id)=>{
    console.log("from app.js: id="+id);
    //change the state 
    this.setState( { todos: this.state.todos.map(todo =>{
      if(todo.id === id){
        todo.completed = !todo.completed //set it to opposite
      }
      return todo;
    })});
  }

  //delete Todo
  delTodo = (id) =>{
    /* deleting with use of server */
    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(res =>  this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  
    /* deleting without use of server
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]});
    */
  }

  //add an item
  addToDo = (title) => {
    /* //method one (w/out server)
    const newTodo = {
      id: uuid.v1(),
      title: title,
      completed: false
    }
    this.setState({todos: [...this.state.todos,newTodo]}) //this will add it to the state
    */

    //make a POST request to JSON placeholder
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
    })
    .then(res=>this.setState({
      todos: [...this.state.todos, res.data]
    }));
  }
   
  render() {
    //console.log(this.state.todos)
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header/>
          <Route exact path="/" render={props =>(
            <React.Fragment>
                  <Add addToDo={this.addToDo}/>
                  <Todos todos={this.state.todos} 
                  markComplete = {this.markComplete}
                  delTodo={this.delTodo}
                  />
            </React.Fragment>
          )}/>

          <Route path="/about" component={About}/>
         
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
