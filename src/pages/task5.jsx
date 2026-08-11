import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';


//fix math.pow()

export default function Task5() {

    const plotA = useRef(null);

    //constants
    const m_e = 9.11e-31
    const e = 1.6e-19
    const h = 6.63e-34
    const c = 3e8
    // vacuum permitivity - capability of a vacuum to permit electric field lines
    const epsilon = 8.85e-12
    // hydrogen atomic number
    let Z = 1

    const traces = []
    const lines = []

    const Colours = ['magenta','red','blue','green','black']

    const names = ['Lyman','Balmer','Paschen','Brackett','Pfund']

    let series_limit_h = (8 * epsilon**2 * h**3 * c)/(m_e * Z**2 * e**4)

    // generate x line at given point with given colour
    function xline(x,colour){

        return {

            type: 'line',
            xref: 'x',
            yref: 'paper',
            x0: x,
            y0: 0,
            x1: x,
            y1: 1,
            line: {
                color : colour,
                width: 1,
                dash: 'dash'
            }
        }
    }

    for(let m=1; m<=5; m++){



        const colour = Colours[m-1]
        const series_name = names[m-1]

        let series_limit = (8 * epsilon**2 * h**3 * c)/(m_e * Z**2 * e**4) * m**2
        series_limit = series_limit * 10**9 

        let photon_eV = 13.6/m**2

        // implement markers


        const xcoord = [series_limit];
        const ycoord = [photon_eV];

        lines.push(xline(series_limit,colour))


        for(let n=m+1; n<=14; n++){
            let wavelength = series_limit_h * ((1/m**2) - (1/n**2))**-1
            wavelength = wavelength * 10**9           

            let Em = -(13.6 / m ** 2)
            let En = -(13.6 / n ** 2)
            //photon energy
            let photonEV = Math.abs(En - Em)

            xcoord.push(wavelength)
            ycoord.push(photonEV)
            lines.push(xline(wavelength,colour))

        }

        traces.push({
            x: xcoord,
            y: ycoord,
            mode: 'markers',
            marker: {color : colour, symbol: 'asterisk-open', size: 8},
            name : `${series_name}`,
            type: 'scatter'


        })

    }


    let layout = {

        title: { text: `Bohr model of Hydrogenic atom <br> photon emissions: Z=1` },
        autosize: true,
        xaxis: {
            title: { text: `λ /nm` },
            range: [0, 8000],


        },
        yaxis: {
            title: { text: `Photon energy /eV` },
            range: [0, 14],
        },

        shapes: lines,
        showlegend: true


    }

    const config = {
        responsive: true,
        displayModeBar: false,
    };


    useEffect(() => {

        if (!plotA.current) return;

        Plotly.newPlot(plotA.current, traces, layout, config);
    }, []);

    return (
        <>
            <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">

                <div className="col-span-2">
                    <div className='flex items-center justify-center my-6 '>
                        <div className='text-3xl font-bold'>
                            Hydrogen emission spectrum and Bohr's model of a hydrogenic atom
                        </div>
                    </div>
                </div>
                <div className="col-start-1">
                    <div className='w-full max-w-[120vh] aspect-16/10' ref={plotA} ></div>
                    

                </div>
                <div className="col-start-2 flex flex-col gap-4">

                    <p>
                        Bohr's model of a hydrogenic atom describes electrons moving around the nucleus of an atom in discrete circular orbits. When an electrons drops from a higher initial energy state (n) to a lower final energy state (m), a photon whose energy is equal to the difference betweeen the 2 levels is emitted.
                    </p>
                    <p>
                        This graph plots the emitted photon energy levels against the wavelength for 5 spectral series, which are sets of distinct wavelengths of light emitted or absorbed when an electron changes energy level.

                    </p>
                    <p>The series are as follows where n is the final energy level which the electrons fall back to : </p>
                    <ul className='list-disc pl-10 '>
                        <li>Lyman (n = 1)</li>
                        <li>Balmer (n = 2)</li>
                        <li>Paschen (n = 3)</li>
                        <li>Brackett (n = 4)</li>
                        <li>Pfund (n = 5)</li>

                    </ul>
                    <p>For each transition, vertical dashed lines have been plotted at every emitted wavelength with stars to represent the corresponding photon energy.</p>
                </div>
            </div>
    
    
        </>
    );



}