import React from 'react';

const UserList = (props) => {
  return (
    <div>
      {
        props.users.map((users) => {
          return (
            <h4
            key={user.id}
            className="box title is-4"
            >{user.username}
            </h4>
          )
        })
      }
    </div>
  )
};
export default UserList;