import React, { useState } from 'react';
import {useSelector} from 'react-redux';


function Trends(props) {

  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Trends');

  return (
    <div>
      <h2>{heading}</h2>
    </div>
  );
}

export default Trends;