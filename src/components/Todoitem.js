import React, { Component } from 'react'
import PropTypes from 'prop-types';


export class Todoitem extends Component {
    
    getStyle = () => {
        //shortcut: use a ternary operator
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ?
            'line-through' : 'none' //if completed, line through
        
        }

        /*
        if (this.props.todo.completed) //if marked as done, put a line through the text
            {
                return {
                textDecoration: 'line-through'}
            }
        else
            {
                return {
                    textDecoration: 'none'}
                
            }
            */
        }

   
  markComplete = (e) =>{
    console.log(this.props);
  }     

  render() {
    const { id,title } = this.props.todo;
    return (
      <div style={this.getStyle()}>
        <p>
            <input type="checkbox" onChange={this.props.markComplete.bind
            (this,id)}/> {" "}
            {title}
            <button onClick={this.props.delTodo.bind(this,id)} style={btnStyle}>x</button>
        </p>
      </div>
    )
  }
}

//prop types
Todoitem.propTypes={
    todos: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
  }

//styling
const itemStyle = {
    backgroundColor: '#f4f4f4'
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}



export default Todoitem
