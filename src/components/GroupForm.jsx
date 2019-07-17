/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import React from 'react';

class GroupForm extends React.Component {
  state = {
    title: '',
    chosen: {},
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  checkedBoxes = (e) => {
    const { chosen } = this.state;
    chosen[e.target.id] = e.target.checked;
    this.setState({ chosen });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user, createGroup } = this.props;
    const { title, chosen } = this.state;
    const users = [];
    for (const key in chosen) {
      if (chosen[key]) {
        users.push(key);
      }
    }
    if (!title || !users.length) return null;
    users.push(user._id);
    const group = {
      type: 'group', title, users,
    };
    createGroup(group);
  }

  render() {
    const {
      people, status, user,
    } = this.props;
    const { title } = this.state;
    const users = people.filter(person => person.email !== user.email);
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="status">{status}</div>
        <div className="form-group">
          <div>Group name</div>
          <input type="text" className="form-control" placeholder="Name" onChange={this.handleChange} name="title" value={title} />
          <div className="mt-2">Choose people</div>
          {
            users.map(person => (
              <div className="form-check mt-3 mb-1" key={person._id}>
                <input className="form-check-input" type="checkbox" id={person._id} onChange={this.checkedBoxes} />
                <div className="form-check-label">{person.email}</div>
              </div>
            ))
          }
        </div>
        <button className="btn-creater" type="submit">Create</button>
      </form>
    );
  }
}

export default GroupForm;
