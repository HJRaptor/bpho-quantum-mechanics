import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


//fix math.pow()

export default function Task5() {

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
        Plotly.newPlot('myplot', traces, layout, config);
    }, []);

    return (
        <>
        {/* Navigation Bar */ }
        < nav className = "bg-white border-b border-gray-100 shadow-sm" >
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

    <div className='w-full max-w-[120vh] aspect-16/10' id="myplot" ></div>
    
        </>
    );



}