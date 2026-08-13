import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';



export default function Task1() {

    //defining plot
    const plotA = useRef(null);

    //defining variables
    const [s, stepsize] = useState("1");
    const [n, numsteps] = useState("1000");
    const [walkNum, walknum] = useState("20");

   // random walk function to generate list of points
  function randomWalk(N, s) {
    let x = [0];
    let y = [0];

    for (let n = 1; n <= N; n++) {
      let theta = 2 * Math.PI * Math.random();

      let nextX = x[x.length - 1] + s * Math.cos(theta);
      let nextY = y[y.length - 1] + s * Math.sin(theta);

      x.push(nextX);
      y.push(nextY);
    }
    
    return { x: x, y: y };
  }



    
    //function for random walk
    function randomWalk1(walk_num,N,s){

        if (!plotA.current) return;

        let traces = [];
        let maxCoord = 0;
        

        for (let i = 1; i <= walk_num; i++) {
            const { x, y } = randomWalk(N, s);


            const localMaxX = Math.max(...x.map(Math.abs));
            const localMaxY = Math.max(...y.map(Math.abs));
            maxCoord = Math.max(maxCoord, localMaxX, localMaxY);
            

            let trace1 = {
                x: x,
                y: y,
                mode: 'lines',
                name: `Walk ${i}`,
                line: { width: 1 }
            };

            traces.push(trace1);
        }

        
        const axisPadding = maxCoord * 1.05;
        let layout = {
            autosize: true,
            title: { text: `Random Walk Simulation :  N = ${walk_num}` },
            showlegend: true,
            xaxis: {

                scaleanchor: 'y',
                scaleratio: 1,
                range: [-axisPadding, axisPadding] 
            },
            yaxis: {
  
                range: [-axisPadding, axisPadding]
            },

            margin: { l: 40, r: 40, t: 40, b: 40 }


        };

        let config = {
            responsive: true,
            displayModeBar: false
        }

        Plotly.newPlot(plotA.current, traces, layout, config);

    }
    
    //initial plot for when website is loaded
    useEffect(() => {
        randomWalk1(20, 1000, 1);
    }, []);

    //generates the plot
    function generatePlot(){
        
        randomWalk1(walkNum, n, s);

    }



  return (
    <>
          <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">
              <div className="col-span-2">
                <div className='flex items-center justify-center my-6 '>
                    <div className='text-3xl font-bold'>
                        Random Walk
                    </div>
                </div>
              </div>
              <div className="col-start-1">
                <div className='w-full max-w-[80vh] aspect-square ml-10' ref={plotA}></div>

              </div>
              <div className="col-start-2 flex flex-col gap-4">
                <p>A random walk is made of a sequence of random steps. In this simulation, the particle moves distance (step size) in a completely random direction, where θ is chosen uniformly between 0° and 360°. Each particle is modelled as a walk, and the number of steps can be used to adjust the number of iterations for which the simulation runs</p>
                <p></p>
                
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium">Step size :</label>
                            <input type='text' value={s} onChange={(e) => stepsize(e.target.value)} className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium">Number of steps :</label>
                            <input type='text' value={n} onChange={(e) => numsteps(e.target.value)} className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium">Number of walks :</label>
                            <input type='text' value={walkNum} onChange={(e) => walknum(e.target.value)} className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                        </div>

                            <button onClick={generatePlot} className='col-span-3 font-semibold text-xl rounded-md bg-[#7a22f5de] text-white p-4 hover:bg-[#7A22F5]'>Generate plot</button>


                    </div>



              </div>
          </div>

    
    </>
  );
}