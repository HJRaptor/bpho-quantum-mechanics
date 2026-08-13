import React, { useRef, useEffect } from 'react';
import Plotly from 'plotly.js-dist';

export default function Task3() {

    const plotRef = useRef(null);
    const plotRef2 = useRef(null);

    function generatePlot(){

        if (!plotRef.current) return;

        const k = 1.381e-23;
        const h = 6.626e-34;
        const c = 2.998e8;

        const n = Number(document.getElementById("n").value);
        const l = Number(document.getElementById("l").value);
        const m = Number(document.getElementById("m").value);

        function PlanckSpectrum(T) {
            const lambda = [];
            const G = [];
            for (let i = 0; i < 100; i++) {
                const wavelength = 0.1e-6 + i * (2.5e-6 - 0.1e-6) / 99;
                const intensity = Math.PI * (2 * h * Math.pow(c, 2) / Math.pow(wavelength, 5)) * (1 / (Math.exp(h * c / (wavelength * k * T)) - 1)) * 1e-9;
                lambda.push(wavelength * 1e9);
                G.push(intensity);
            }
            return {
                x: lambda,
                y: G
            };
        }

        const spectrumn = PlanckSpectrum(n);
        const spectruml = PlanckSpectrum(l);
        const spectrumm = PlanckSpectrum(m);

        const data = [
            {
                x: spectrumn.x,
                y: spectrumn.y,
                mode: 'lines',
                name: String(n) + ' K'
            },
            {
                x: spectruml.x,
                y: spectruml.y,
                mode: 'lines',
                name: String(l) + ' K'
            },
            {
                x: spectrumm.x,
                y: spectrumm.y,
                mode: 'lines',
                name: String(m) + ' K'
            }
        ];

        const layout = {
            title: { text: 'Solar Irradiance vs Wavelength' },
            xaxis: {
                title: { text: 'Wavelength / nm' }
            },
            yaxis: {
                title: { text: 'Irradiance / W m⁻² nm⁻¹' }
            }
        };

        Plotly.newPlot(plotRef.current, data, layout);

    }

    function generatePlot2(){

        const k = 1.381e-23;
        const h = 6.626e-34;
        const R = 8.314;

        function EinsteinHeatCapacity(f) {
            const T = [];
            const C = [];
            for (let i = 0; i < 100; i++) {
                const temperature = 1 + i * (800 - 1) / 99;
                const x = (h * f) / (k * temperature);
                const heatCapacity =
                    (3 * R) * ((Math.pow(x, 2) * Math.exp(x)) / Math.pow(Math.exp(x) - 1, 2));
                T.push(temperature);
                C.push(heatCapacity);
            }
            return {
                x: T,
                y: C
            };
        }

        const gold = EinsteinHeatCapacity(0.2855e13);
        const copper = EinsteinHeatCapacity(0.5769e13);
        const titanium = EinsteinHeatCapacity(0.7054e13);
        const aluminium = EinsteinHeatCapacity(0.7188e13);
        const iron = EinsteinHeatCapacity(0.7893e13);
        const silicon = EinsteinHeatCapacity(1.0832e13);
        const carbon = EinsteinHeatCapacity(3.7451e13);

        const data = [
            {
                x: gold.x,
                y: gold.y,
                mode: 'lines',
                name: 'Au'
            },
            {
                x: copper.x,
                y: copper.y,
                mode: 'lines',
                name: 'Cu'
            },
            {
                x: titanium.x,
                y: titanium.y,
                mode: 'lines',
                name: 'Ti'
            },
            {
                x: aluminium.x,
                y: aluminium.y,
                mode: 'lines',
                name: 'Al'
            },
            {
                x: iron.x,
                y: iron.y,
                mode: 'lines',
                name: 'Fe'
            },
            {
                x: silicon.x,
                y: silicon.y,
                mode: 'lines',
                name: 'Si'
            },
            {
                x: carbon.x,
                y: carbon.y,
                mode: 'lines',
                name: 'C'
            }
        ];

        const layout = {
            title: {
                text: "Einstein Model of Heat Capacity"
            },
            xaxis: {
                title: {
                    text: "T / K"
                }
            },
            yaxis: {
                title: {
                    text: "Heat Capacity / J mol⁻¹ K⁻¹"
                }
            },
        };

        Plotly.newPlot(plotRef2.current,data,layout,);

    }

    useEffect(() => {
        generatePlot();
        generatePlot2();
    }, []);


    return (
        <>    

        <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">
            <div className="col-span-2">
                <div className='flex items-center justify-center my-6 '>
                    <div className='text-3xl font-bold'>
                        Planck "Black Body Radiation" Spectrum
                    </div>
                </div>
            </div>
            <div className="col-start-1">
                <p>Plot of Planck 'Black Body Radiation' Spectrum for the temperatures of 4000K, 5000K and 6000K. It shows how the intensity of electromagnetic radiation emmitted by a perfect black body changes across different wavelengths.</p>
                <p>Input 3 values for temperature in Kelvin to produce a plot.</p>
                <div className="grid grid-cols-3 gap-4 items-center">
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">Temperature 1:</label>
                        <input type='text'  id='n' defaultValue="4000" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">Temperature 2:</label>
                        <input type='text'  id='l' defaultValue="5000" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg font-medium">Temperature 3:</label>
                        <input type='text'  id='m' defaultValue="6000" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                    </div>
                        <button onClick={generatePlot} className='col-span-3 font-semibold text-xl rounded-md bg-[#7a22f5de] text-white p-4 hover:bg-[#7A22F5]'>Generate plot</button>
                </div>
                <div className='w-full h-150' ref={plotRef}></div>
            </div>
            <div className="col-start-2 flex flex-col gap-4">
                <p>Plot of Einstein's model of molar heat capacity of solids (gold, copper, titanium, aluminium, iron, silicon and carbon) against temperature, which shows how heat capacity decreases significantly at low temperatures as atomic vibrations are quantised.</p>
                <div className='w-full aspect-square' ref={plotRef2}></div>
            </div>
        </div>

        </>
    );



}