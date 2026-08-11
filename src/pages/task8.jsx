import React, { useState, useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function Task8() {


    const [theta, setTheta] = useState(0);
    const [phi, setPhi] = useState(0);

    const plotA = useRef(null);
    const plotB = useRef(null);
    const plotC = useRef(null);

    

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


        if  (plotA.current){
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


            Plotly.newPlot (plotA.current, tracesA, {
                ...layoutConfig,
                title: 'Detector A (θ)'
            },config);
        }

 

        if (plotB.current) {
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

            Plotly.newPlot(plotB.current, tracesB, {
                ...layoutConfig,
                title: 'Detector B (φ)'
            },config);
        }

        if (plotC.current) {

            const data = [
                {
                    x: ['Classical', 'Quantum '],
                    y: [classicalP, quantumP],
                    type: 'bar',
                    marker: {
                        color: ['#3b82f6', '#ef4444']
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

            Plotly.newPlot(plotC.current, data, layout1, config1);




        }


    },[theta, phi]);
    

    return (
        <>
            <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">

                <div className="col-span-2">
                    <div className='flex items-center justify-center my-6 '>
                        <div className='text-3xl font-bold'>
                            Quantum cryptography
                        </div>
                    </div>
                </div>
                <div className="col-start-1 ">
                    <div className="grid grid-cols-2 gap-4">
                        <div className='flex flex-col p-4'>
                            <label className="font-semibold  mb-1">Detector A</label>
                            <label className="font-semibold  mb-1">Theta: {theta}°</label>
                            
                            <input
                                type="range"
                                min="-90"
                                max="90"
                                value={theta}
                                className="slider w-full cursor-pointer mb-1"
                                id="theta"
                                onChange={(e) => setTheta(Number(e.target.value))}
                            />
                            <div className='w-full aspect-square' ref={plotA} ></div>
                        </div>
                        <div className='flex flex-col p-4'>
                            <label className="font-semibold  mb-1">Detector B</label>
                            <label className="font-semibold  mb-1">Phi: {phi}°</label>
                            
                            <input
                                type="range"
                                min="-90"
                                max="90"
                                value={phi}
                                className="slider w-full cursor-pointer mb-1"
                                id="phi"
                                onChange={(e) => setPhi(Number(e.target.value))}
                            />
                            <div className='w-full aspect-square' ref={plotB} ></div>
                        </div>
                        
                    </div>
                    
                    <p>
                        Quantum cryptography relies on quantum entanglment and wavefunction collapse to allow secure communication between two parties. In this protocol entangled photon pairs are measured using two independent detectors at theta and phi. If an eavesdropper attempts to intercept a photon, the act of measurement will collapse the photon's wavefunction to that of the detector, altering the state. This interception introduces detectable stastical discrepancies, making it clear an eavesdropper is present.
                    </p>
                    <p>
                        Above is a visual calculator representing the orientations of the 2 detectors. The bar chart on the right compares the theoretical mismatch probability between the classical model and the quantum model for 2 given angles.
                    </p>

                </div>
                <div className="col-start-2 gap-4">
                    <div className='w-full aspect-square max-h-[80vh] p-4' ref={plotC} ></div>
                </div>
            </div>


            
        </>
    );


    
}
