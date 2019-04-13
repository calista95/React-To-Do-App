import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Add extends Component {
    state = {
        title: ''
    }

    onChange = (e) => this.setState({ [e.target.name]:
        e.target.value
    });

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addToDo(this.state.title);
        this.setState({title:''});
    }

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{display:'flex'}}>
         <input 
         type="text" 
         name="title" 
         style={{ flex: '10', padding:'5px' }}
         placeholder="Add To Do..."
         value={this.state.title}
         onChange={this.onChange}
         />
         <input type="submit" 
         value="Submit"
         className="btn"
         style={{flex:'1'}}
         />
      </form>
    )
  }
}

Add.propTypes={
  addToDo: PropTypes.func.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
}