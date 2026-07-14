import React, { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function Task8() {


    const [theta, setTheta] = useState(0);
    const [phi, setPhi] = useState(0);

    const plotRefA = useRef(null);
    const plotRefB = useRef(null);
    const plotRefC = useRef(null);

    

    //functions to calculate correct probability
    function classical_prob(theta,phi){
        const theta_r = theta*Math.PI/180
        const phi_r = phi*Math.PI/180
        let p = 1 - (Math.cos(theta_r))**2 * (Math.cos(phi_r))**2 - (Math.sin(theta_r))**2 * (Math.sin(phi_r))**2
        return p
    }   

    function quantum_prob(theta,phi){
        const theta_r = theta*Math.PI/180
        const phi_r = phi*Math.PI/180
        let p = (Math.sin(phi_r - theta_r))**2
        return p
    }
    

    useEffect(() => {
        
        const classicalP = classical_prob(theta, phi);
        const quantumP = quantum_prob(theta, phi);


        const layoutConfig = {
            xaxis: { 
                range: [-3, 3],
                scaleanchor : 'y',
                scaleratio: 1,

            },
            yaxis: { 
                range: [-3, 3]
             
            },

        };

        let config = {
            responsive: true,
            displayModeBar: false
        }

        //norm = 1


        if (plotRefA.current){
            const theta_r = theta * Math.PI / 180
            const xa1 = Math.sin(theta_r);
            const ya1 = Math.cos(theta_r);
            const xa2 = -Math.cos(theta_r);
            const ya2 = Math.sin(theta_r);

            const tracesA = [
                {
                    x: [0, xa1],
                    y: [0, ya1],
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'X(A)',
                    
                },
                {
                    x: [0, xa2],
                    y: [0, ya2],
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Y(A)',
                }
            ];


            Plotly.newPlot(plotRefA.current, tracesA, {
                ...layoutConfig,
                title: 'Detector A (θ)'
            },config);
        }

 

        if (plotRefB.current) {
            const phi_r = phi * Math.PI / 180;
            const xb1 = Math.sin(phi_r);
            const yb1 = Math.cos(phi_r);
            const xb2 = -Math.cos(phi_r);
            const yb2 = Math.sin(phi_r);

            const tracesB = [
                {
                    x: [0, xb1],
                    y: [0, yb1],
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'X(B)',
                },

                {
                    x: [0, xb2],
                    y: [0, yb2],
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'Y(B)',
                }
            ];

            Plotly.newPlot(plotRefB.current, tracesB, {
                ...layoutConfig,
                title: 'Detector B (φ)'
            },config);
        }

        if (plotRefC.current) {

            const data = [
                {
                    x: ['Classical', 'Quantum '],
                    y: [classicalP, quantumP],
                    type: 'bar',
                    marker: {
                        color: ['#3b82f6', '#ef4444'] // Blue and Red matching standard styling
                    },
                    text: [
                        `${(classicalP * 100).toFixed(1)}% (${classicalP.toFixed(3)})`,
                        `${(quantumP * 100).toFixed(1)}% (${quantumP.toFixed(3)})`
                    ],
                    textposition: 'auto',
                }
            ];

            const layout1 = {
                title: {
                    text: 'Mismatch Probabilities Comparison',
                    font: { size: 16 }
                },
                yaxis: {
                    title: 'Probability',
                    range: [0, 1.05],
                    tickformat: ',.0%'
                },
                xaxis: {
                    fixedrange: true
                },
                margin: { t: 50, b: 40, l: 50, r: 20 },
                responsive: true
            };

            const config1 = { displayModeBar: false };

            Plotly.newPlot(plotRefC.current, data, layout1, config1);




        }


    },[theta, phi]);
    

    return (
        <>

            <div className="p-4 max-w-4xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                    <div className="flex flex-col space-y-4">
                        <div className="slidecontainer flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Detector A</label>
                            <label className="font-semibold text-gray-700 mb-1">Theta: {theta}°</label>
                            <input
                                type="range"
                                min="-90"
                                max="90"
                                value={theta}
                                className="slider w-full cursor-pointer"
                                id="theta"
                                onChange={(e) => setTheta(Number(e.target.value))}
                            />
                        </div>
                        <div className="w-full aspect-square border rounded-lg bg-gray-50 shadow-sm" ref={plotRefA}></div>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <div className="slidecontainer flex flex-col">
                            <label className="font-semibold text-gray-700 mb-1">Detector B</label>
                            <label className="font-semibold text-gray-700 mb-1">Phi: {phi}°</label>
                            <input
                                type="range"
                                min="-90"
                                max="90"
                                value={phi}
                                className="slider w-full cursor-pointer"
                                id="phi"
                                onChange={(e) => setPhi(Number(e.target.value))}
                            />
                        </div>
                        <div className="w-full aspect-square border rounded-lg bg-gray-50 shadow-sm" ref={plotRefB}></div>
                    </div>
                    


                </div>
                <div className="w-full aspect-square border rounded-lg bg-gray-50 shadow-sm" ref={plotRefC}></div>
            </div>
        </>
    );


    
}
