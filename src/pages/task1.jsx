import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"



export default function Task1() {




   // random walk function to generate list of points
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



    
    //function for random walk
    function randomWalk1(walk_num,N,s){

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
            //title: { text: 'Random Walk' },
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

        Plotly.newPlot('myplot', traces, layout, config);

    }
    
    //initial plot for when website is loaded
    useEffect(() => {
        randomWalk1(20, 1000, 1);
    }, []);

    //generates the plot
    function generatePlot(){
        var s = document.getElementById('s').value
        var N = document.getElementById('N').value
        var walkNum = document.getElementById('wn').value

        randomWalk1(walkNum, N, s);

    }



  return (
    <>

    <nav className="bg-white">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-center gap-8 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        Home
                    </Link>
                    
                    {/* Navigation Links */}
                    <Link 
                        to="/task1" 
                        className={`transition font-medium ${
                            location.pathname === '/task1' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Task 1
                    </Link>
                    
                    <Link 
                        to="/task2" 
                        className={`transition font-medium ${
                            location.pathname === '/task2' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Task 2
                    </Link>
                    
                    <Link 
                        to="/about" 
                        className={`transition font-medium ${
                            location.pathname === '/about' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        About
                    </Link>
                </div>
            </div>
        </nav>    

    
    <div className='flex flex-row w-full min-h-screen'>

        

        <div className="basis-1/2 flex flex-col items-center justify-center p-4">
            
            {/* graph */}
            <div className='w-full max-w-[80vh] aspect-1/1' id="myplot" ></div>
            
                {/* buttons */}

                  <div className='flex flex-col gap-4 mt-4'>
                      <div className='flex flex-row gap-4'>
                          <div className='flex flex-col'>
                              <h4 className='mb-1 font-semibold'>Step Size :</h4>
                              <input type='text'  id='s' defaultValue="1" className='px-2 py-1 border rounded-md focus:outline-none focus:ring-0'></input>
                          </div>

                          <div className='flex flex-col'>
                              <h4 className='mb-1 font-semibold'>Number of Steps :</h4>
                              <input type='text'  id='N' defaultValue="1000" className='px-2 py-1 border rounded-md focus:outline-none focus:ring-0'></input>
                          </div>

                          <div className='flex flex-col'>
                              <h4 className='mb-1 font-semibold'>Number of Walks :</h4>
                              <input type='text'  id='wn' defaultValue="20" className='px-2 py-1 border rounded-md focus:outline-none focus:ring-0'></input>
                          </div>

                          <div className='flex items-end'>
                              <Button onClick={generatePlot} className='rounded-md '>Generate plot</Button>
                          </div>
                      </div>
                  </div>
                


            </div>

    </div>
    </>
  );
}