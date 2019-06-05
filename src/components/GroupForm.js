import React from 'react';

class GroupForm extends React.Component {
  state ={
    title: '',
    people: {}
  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }
  checkedBoxes = (e) => {
    const {people} = this.state;
    people[e.target.id] = e.target.checked;
    this.setState({people});   
  }

  handleSubmit = () => {
    const {email} = this.props;
    const {title, people} = this.state;
    if(!title || !people) return null;
    const users = [];
    users.push(email);
    for (var key in people) {
      if (people[key]){
        users.push(key);
      }
    }

    return { type: title, users, messages: [] }
  }
  render(){
    const {list, createGroup, status} = this.props;
    const {title} = this.state;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        createGroup(this.handleSubmit())
        }}>
          <div className='status'>{status}</div>
        <div className="form-group">
          <label >Group name</label>
          <input type="text" className="form-control" placeholder="Name" onChange={this.handleChange} name = 'title' value={title}/>
          <label className='mt-2'>Choose people</label>
          {
            list.map(user => {
              return (
                <div className="form-check mt-3 mb-1" key={user}>
                  <input className="form-check-input" type="checkbox" id={user} onChange={this.checkedBoxes}/>
                  <label className="form-check-label">{user}</label>
                </div>
              )
            }) 
          }
        </div>
        <button className='btn btn-danger' type='submit'>Create</button>
      </form>
    )
  }
}

export default GroupForm;