import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function MealEdit(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Meal Edit');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default MealEdit;