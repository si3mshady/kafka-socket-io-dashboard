import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/plots';

export const DemoLiquid = () => {
  const config = {

   
    percent: 0.65,
    fill: 'orange',
    color: '#008F11',
    shape: 'rect',
   
    shadowBlur: 1,
    outline: {
      border: 20,
      distance: 18,
    },
    wave: {
      length: 128,
    },
    pattern: {
      type: 'square',
    },
  };
  return <Liquid {...config} />;
};

