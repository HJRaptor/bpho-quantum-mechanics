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
                <div className="col-start-1 flex flex-col gap-2">
                    <div className='w-full max-w-[95vh] aspect-16/10' ref={plotA} ></div>
                    <p>
                        This simulation is a plot of probability density against angstroms, and shows the likelihood of finding an electron at a specific position x across the box width which is the Bohr radius (0.592Å).
                    </p>
                    <p>
                        The probability drops to 0 at the walls when x is 0 and 0.529Å, proving that the electron is completely trapped insde the box. When n=1, the electron is most likely to found at the center of the potential well. As energy states increase, new locations where the probability of finding an electron are zero are introduced. All the states have the same peak height, which ensures the total probability of finding the electron somewhere in the well is 100%.
                    </p>

                </div>
                <div className="col-start-2 flex flex-col gap-2">
                    <div className='w-full max-w-[95vh] aspect-16/10' ref={plotB} ></div>
                    <p>
                        The particle in a box model describes a quantum particle, in our case an electron with mass 9.109 x 10^-31kg, confined within an infinitely deep potential well of width L. This model was created in the early development of quantum mechanics, and demonstrates that a microscopic particle trapped within a region of space can't hold arbitary energy values. Its energy levels must be quantized into discrete levels.
                    </p>
                    <p>
                        The graph above plots energy of the electron against its quantum number, the quantized energy level. The blue dots highlight the allowed energy states. Although valid states doesn't exist for non-integer values, a continuous quadratic curve is plotted to illustrate the relationship. The first point is when (n=1) since, the particle can never have zero kinetic energy, explained by the Heisenberg Uncertainty Principle. 
                    </p>
                </div>
            </div>

        </>
    );



}