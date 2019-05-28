import React from 'react';

class ListArea extends React.Component{
  render(){
          
    return (
      <div className='list-area mt-3'>
        <h2 className='list p-2'>People online</h2>
        <div className='person m-1'>
          <div className='m-2'>email</div>
          <button className='btn btn-danger'>Connect</button>
        </div>
      </div>
    )
  }
}

export default ListArea;