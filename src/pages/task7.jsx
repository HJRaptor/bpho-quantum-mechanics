import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';

import particle_in_a_box from '@/assets/particle_in_a_box.json';
import energy_levels from '@/assets/energy_levels.json'



export default function Task7() {

    const plotA = useRef(null);
    const plotB = useRef(null);

    

    




    const layout1 = {
        title: { text: `Particle in a box Simulation <br> m = 9.11e-31 kg` },
        autosize: true,
        xaxis: {
            title: { text: `x /angstroms` },
            showgrid: true,


        },
        yaxis: {
            title: { text: `Probability Density` },
            exponentformat: 'power',
            showexponent: 'all',
            range: [0, 40000000000],

        },

    

        //showlegend: false,
    }

    const layout2 = {
        showlegend: false,
        title: { text: `Particle in a box / eV <br> m = 9.11e-31 kg` },
        autosize: true,
        xaxis: {
            title: { text: `Quantum number` },
            showgrid: true,


        },
        yaxis: {
            title: { text: `Energy / eV` }

        },
    }

    const config = {
            responsive: true,
            displayModeBar: false,

        };

    

    
    useEffect(() => {

        if (plotA.current) {
            const n1 = particle_in_a_box.data[0];

            const trace1 = {
                x: n1.x.map(val => val),
                y: n1.y.map(val => val),
                mode: 'lines',
                name: 'n = 1',
                line: { color: 'blue' }

            }

            const n2 = particle_in_a_box.data[1];

            const trace2 = {
                x: n2.x.map(val => val),
                y: n2.y.map(val => val),
                mode: 'lines',
                name: 'n = 2',
                line: { color: 'green' }

            }

            const n3 = particle_in_a_box.data[2];

            const trace3 = {
                x: n3.x.map(val => val),
                y: n3.y.map(val => val),
                mode: 'lines',
                name: 'n = 3',
                line: { color: 'red' }

            }
            
            const traces = [trace1,trace2,trace3 ]

            Plotly.newPlot(plotA.current, traces, layout1, config);
        }

        if (plotB.current) {
            const dot = energy_levels.data[0];
            const curve = energy_levels.data[1];

            const trace4 = {
                x: curve.x.map(val => val),
                y: curve.y.map(val => val),
                mode: 'lines',
                name: 'n = 1',
                line: { color: 'blue' }

            }

            const trace5 = {
                x: dot.x.map(val => val),
                y: dot.y.map(val => val),
                mode : 'markers',
                line: {color: 'blue'}
            }

            Plotly.newPlot(plotB.current, [trace4,trace5], layout2, config)
        }   



    }, []);




    return (
        <>
            
            <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">

                <div className="col-span-2">
                    <div className='flex items-center justify-center my-6 '>
                        <div className='text-3xl font-bold'>
                            Particle-in-a-box solution to the Schrödinger Equation
                        </div>
                    </div>
                </div>
                <div className="col-start-1">
                    <div className='w-full max-w-[68vh] aspect-16/10' ref={plotA} ></div>
                    <div className='w-full max-w-[64vh] aspect-16/10' ref={plotB} ></div>


                </div>
                <div className="col-start-2 flex flex-col gap-4">

                    <p>
                        .....
                    </p>
                </div>
            </div>

        </>
    );



}