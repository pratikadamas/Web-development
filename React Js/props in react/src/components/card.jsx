import React from 'react';

const Card = (user) => {
    // parameter catch as a object 
    // console.log(user.name ,user.age)
  return (
    <div className="parent">
      <div className="card">
        <img 
          src={user.img}
          alt="Profile" 
        />
        {/* <h2>Pratik Giri</h2> */}
        <h2>{user.name}, {user.age}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, necessitatibus.</p>
        <button>View Profile</button>
      </div>
    </div>
  );
};

export default Card;
