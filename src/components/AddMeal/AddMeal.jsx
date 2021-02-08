import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function AddMeal(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Add Meal');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default AddMeal;