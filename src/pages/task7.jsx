import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import particle_in_a_box from '@/assets/particle_in_a_box.json';



export default function Task7() {


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




    const layout = {

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

    const config = {
            responsive: true,
            displayModeBar: false,
        };

    const traces = [trace1,trace2,trace3 ]
    
    useEffect(() => {
        Plotly.newPlot('myplot', traces, layout, config);
    }, []);




    return (
        <>
            {/* Navigation Bar */}
            < nav className="bg-white border-b border-gray-100 shadow-sm" >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-center gap-8 items-center">
                        {/* Logo / Home */}
                        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                            ℏome

                        </Link>
                        {/* Navigation Links */}
                        <Link to="/task1" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Task 1
                        </Link>

                        <Link to="/task2" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Task 2
                        </Link>

                        {/* Added Task 3 link since it exists in your routes */}
                        <Link to="/task3" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Task 3
                        </Link>

                        <Link to="/task4" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Task 4
                        </Link>
                        <Link to="/task5" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Task 5
                        </Link>

                        <Link to="/task7" className="text-gray-600 hover:text-blue-600 transition-colors">
                            Task 7
                        </Link>
                    </div>
                </div>
            </nav >


        <div className='flex flex-auto flex-row mt-4'>
            
            <div className='w-full max-w-[100vh] aspect-3/2' id="myplot" ></div>

        </div>


        </>
    );



}