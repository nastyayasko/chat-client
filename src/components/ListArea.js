import React from 'react';

class ListArea extends React.Component{
  render(){
    const {people, handleConnect, handleBlock} = this.props; 
    return (
      <div className='people-online-area'>
        <div className='people-online'>
          {
            people.map(person => (
              <div className='person m-1' key={person}>
                <div className='m-1 email'>{person}</div>
                <div className = 'person-btns'>
                  <button className='btn btn-success' onClick={()=>handleConnect(person)}>Message</button>
                  <button className='btn btn-dark'  onClick={()=>handleBlock(person)}>Block</button>
                </div>
              </div>
            ))
          } 
        </div>
        
      </div>
    )
  }
}

export default ListArea;