import React from 'react';

function ListArea(props) {
  const {people, handleConnect, currentDialog, user} = props; 
  let current;
  const photo = 'https://www.achievesuccesstutoring.com/wp-content/uploads/2019/05/no-photo-icon-22.jpg.png';
  if (currentDialog && currentDialog.type ==='individual'){
    current = currentDialog.users.find(person => person !== user._id);
  }
  return (
    <div className='people-online-area'>
      <div className='people-online'>
        {
          people.map(person =>  (
              <div className={ person._id === current?'person m-1 currentPerson':'person m-1'} onClick={()=>handleConnect(person._id)} key={person._id}>
                <div>
                  <img className='photo-m mr-1' src={person.img?person.img:photo} alt='faces'></img>
                </div>
                <div className='m-1 email'>{person.firstName} {person.lastName}</div>
              </div>
            )
          )
        } 
      </div>
      
    </div>
  )
}

export default ListArea;