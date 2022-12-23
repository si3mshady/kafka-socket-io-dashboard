import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Gauge } from '@ant-design/plots';


export const DemoGauge = ({instance_id, stats}) => {
    const config = {
        type: "meter",
      width: 300,
      percent: stats,
      range: {
        color: '#30BF78',
      },
      indicator: {
        pointer: {
          style: {
            stroke: '#D0D0D0',
          },
        },
        pin: {
          style: {
            stroke: '#D0D0D0',
          },
        },
      },
      axis: {
        label: {
          formatter(v) {
            return Number(v) * 100;
          },
        },
        subTickLine: {
          count: 3,
        },
      },
      statistic: {
        content: {
          formatter: ({ percent }) => `${instance_id} CPU: ${(percent * 100).toFixed(0)}%`,
          style: {
            color: 'yellow',
            fontSize: 8,
          },
        },
      },
    };
    return <Gauge {...config} />;
  };