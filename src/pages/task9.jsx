import React, { useRef, useEffect } from 'react';
import Plotly from 'plotly.js-dist';

export default function Task9() {

    const fractionalRef = useRef(null);
    const speedRef = useRef(null);
    const angleRef = useRef(null);

    function generatePlots() {

        const energy1 = Number(document.getElementById("energy1").value);
        const energy2 = Number(document.getElementById("energy2").value);
        const energy3 = Number(document.getElementById("energy3").value);
        const e = 1.6e-19;
        const c = 3.0e8;
        const h = 6.626e-34;
        const m = 9.11e-31;
        const E = [energy1*e, energy2*e, energy3*e];
        const lambda = [];

        for (let i = 0; i < 3; i++) {
            lambda[i] = (h * c) / E[i];
        }

        const theta = [];
        const thetaDeg = [];

        for (let i = 0; i < 100; i++) {
            theta[i] = i * Math.PI / 99;
            thetaDeg[i] =
                theta[i] / Math.PI * 180;
        }

        const constant = h / (m * c);
        const deltaLambda = [];

        for (let i = 0; i < 100; i++) {
            deltaLambda[i] =
                constant *
                (1 - Math.cos(theta[i]));
        }

        const fractionalData = [];

        for (let i = 0; i < 3; i++) {
            const fractionalWavelength = [];
            for (let j = 0; j < 100; j++) {
                fractionalWavelength[j] =
                    deltaLambda[j] / lambda[i];
            }

            fractionalData.push({
                x: thetaDeg,
                y: fractionalWavelength,
                mode: 'lines',
                name: `${E[i] / e} eV`
            });
        }

        const fractionalLayout = {
            title: {
                text: 'Fractional Wavelength'
            },
            xaxis: {
                title: {
                    text: 'Photon Scattering Angle / deg'
                }
            },
            yaxis: {
                title: {
                    text: 'Fractional Wavelength'
                }
            },
        };

        Plotly.newPlot(
            fractionalRef.current,
            fractionalData,
            fractionalLayout,
            { responsive: true }
        );

        const speedData = [];

        for (let j = 0; j < 3; j++) {
            const newLambda = [];
            const velocityOverC = [];

            for (let i = 0; i < 100; i++) {
                newLambda[i] = deltaLambda[i] + lambda[j];
                const denominator = (h * c / lambda[j]) - (h * c / newLambda[i]) + (m * Math.pow(c, 2));
                const velocity = c * Math.sqrt(1 - Math.pow((m * Math.pow(c, 2)) /denominator,2));
                velocityOverC[i] = velocity / c;

            }

            speedData.push({
                x: thetaDeg,
                y: velocityOverC,
                mode: 'lines',
                name: `${E[j] / e} eV`
            });

        }


        const speedLayout = {
            title: {
                text: 'Electron Recoil Speed'
            },
            xaxis: {
                title: {
                    text: 'Photon Scattering Angle / deg'
                }
            },
            yaxis: {
                title: {
                    text: 'Electron Recoil Speed v/c'
                }
            },
        };

        Plotly.newPlot(
            speedRef.current,
            speedData,
            speedLayout,
            { responsive: true }
        );

        const angleData = [];


        for (let k = 0; k < 3; k++) {
            const phiDeg = [];
            for (let i = 0; i < 100; i++) {
                const phi = Math.atan(Math.sin(theta[i]) / (1 + (h /(m * c * lambda[k])) * (1 - Math.cos(theta[i])) - Math.cos(theta[i])));
                phiDeg[i] = phi / Math.PI * 180;
            }

            angleData.push({
                x: thetaDeg,
                y: phiDeg,
                mode: 'lines',
                name: `${E[k] / e} eV`
            });
        }

        const angleLayout = {
            title: {
                text: 'Electron Recoil Angle'
            },
            xaxis: {
                title: {
                    text: 'Photon Scattering Angle / deg'
                }
            },
            yaxis: {
                title: {
                    text: 'Electron Recoil Angle / deg'
                }
            },
        };

        Plotly.newPlot(
            angleRef.current,
            angleData,
            angleLayout,
            { responsive: true }
        );
    }

    useEffect(() => {
        generatePlots();
    }, []);

    return (
        <>

        <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">
            <div className="col-span-2">
                <div className='flex items-center justify-center my-6 '>
                    <div className='text-3xl font-bold'>
                        Compton Scattering
                    </div>
                </div>
            </div>
            <div className="col-start-1">
                <div ref={angleRef} className="w-full h-[500px]"/>
                <div className="h-6"></div>
                <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
                <div className="h-6"></div>
                <div ref={speedRef} className="w-full h-[500px]"/>
            </div>
            <div className="col-start-2 flex flex-col gap-4">
                <p>Compton scattering shows that electromagnetic radiation behaves like particles (photons), providing evidence for wave-particle duality.</p>
                <ul>
                    <li>Top left: shows how electron recoil angle varies with photon scattering angle.</li>
                    <li>Bottom left: shows how electron recoil speed varies with photon scattering angle.</li>
                    <li>Bottom right: shows how fractional wavelength shift varies with photon scattering angle.</li>
                </ul>
                <p>Input three values for the initial energy of the photons in eV.</p>
                <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">Photon energy 1:</label>
                        <input type='text'  id='energy1' defaultValue="50000" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">Photon energy:</label>
                        <input type='text'  id='energy2' defaultValue="100000" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">Photon energy:</label>
                        <input type='text'  id='energy3' defaultValue="200000" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                    </div>
                        <button onClick={generatePlots} className='col-span-3 font-semibold text-xl rounded-md bg-[#7a22f5de] text-white p-4 hover:bg-[#7A22F5]'>Generate plots</button>
                </div>
                <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
                <div className="h-6"></div>
                <div ref={fractionalRef} className="w-full h-[500px]"/>
            </div>
        </div>

        </>
    );

    
}
