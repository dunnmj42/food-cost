import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function MealDetails(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Meal Details');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default MealDetails;