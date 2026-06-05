import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

export default function Task1() {


  function randomWalk(N, s) {
    let x = [0];
    let y = [0];

    for (let n = 2; n <= N; n++) {
      let theta = 2 * Math.PI * Math.random();

      let nextX = x[x.length - 1] + s * Math.cos(theta);
      let nextY = y[y.length - 1] + s * Math.sin(theta);

      x.push(nextX);
      y.push(nextY);
    }
    
    return { x: x, y: y };
  }


  useEffect(() => {
    let walk_num = 50;
    let N = 1000;
    let s = 1;
    let traces = [];


    for (let i = 1; i <= walk_num; i++) {
      const { x, y } = randomWalk(N, s);

      let trace1 = {
        x: x,
        y: y,
        mode: 'lines',
        name: `Walk ${i}`,
        line: { width: 1 }
      };

      traces.push(trace1);
    }

    let layout = {
        autosize: true,
        title: { text: 'Random Walk' },
        showlegend: true,
        xaxis: {
    
            scaleanchor: 'y', 
            scaleratio: 1     
        },



      
    };

    let config = {responsive: true}

    Plotly.newPlot('myplot', traces, layout, config);

  }, []);


  return (
    <div id="myplot" style={{ width: '80vh', maxWidth: '100%', aspectRatio: '1 / 1', margin: '0 auto' }}></div>
  );
}