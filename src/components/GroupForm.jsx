/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
import React from 'react';

class GroupForm extends React.Component {
  state = {
    title: '',
    chosen: {},
    img: 'https://www.applozic.com/resources/lib/advanced/css/app/images/mck-icon-group.png',
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

  handleSubmit = () => {
    const { user } = this.props;
    const { title, chosen, img } = this.state;
    const users = [];
    for (const key in chosen) {
      if (chosen[key]) {
        users.push(key);
      }
    }
    if (!title || !users.length) return null;
    users.push(user._id);
    return {
      type: 'group', title, users, img,
    };
  }

  render() {
    const { people, createGroup, status } = this.props;
    const { title } = this.state;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        createGroup(this.handleSubmit());
      }}
      >
        <div className="status">{status}</div>
        <div className="form-group">
          <div>Group name</div>
          <input type="text" className="form-control" placeholder="Name" onChange={this.handleChange} name="title" value={title} />
          <div className="mt-2">Choose people</div>
          {
            people.map(user => (
              <div className="form-check mt-3 mb-1" key={user._id}>
                <input className="form-check-input" type="checkbox" id={user._id} onChange={this.checkedBoxes} />
                <div className="form-check-label">{user.email}</div>
              </div>
            ))
          }
        </div>
        <button className="btn-creater" type="button">Create</button>
      </form>
    );
  }
}

export default GroupForm;