import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function MealEdit(props) {

  const details = useSelector((store) => store?.details);
  

  return (
    <div>
      <h2>Edit</h2>
    </div>
  );
}

export default MealEdit;