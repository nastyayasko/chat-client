import React from 'react';

class ListArea extends React.Component{
  render(){
    const {people, handleConnect, handleBlock} = this.props; 
    return (
      <div className='list-area mt-3'>
        <h2 className='list p-2'>People online</h2>
        {
          people.map((person,i) => (
            <div className='person m-1' key={i}>
              <div className='m-2 email'>{person}</div>
              <div className = 'person-btns'>
                <button className='btn btn-success' onClick={()=>handleConnect(person)}>Connect</button>
                <button className='btn btn-dark'  onClick={()=>handleBlock(person)}>Block</button>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default ListArea;