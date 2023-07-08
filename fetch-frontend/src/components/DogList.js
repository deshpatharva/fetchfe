import React from 'react';

const DogList = ({ dogs }) => {
  return (
    <div className="dog-list">
      <h2 className="subheading">Dog List</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <img className="dog-image" src={dog.img} alt={dog.name} />
            <p>Name: {dog.name}</p>
            <p>Age: {dog.age}</p>
            <p>Breed: {dog.breed}</p>
            <p>Zip Code: {dog.zip_code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogList;
