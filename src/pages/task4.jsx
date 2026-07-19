import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"


export default function Task4() {


    //constants
    const h = 6.63e-34;
    const e = 1.6e-19;
    const c = 3e8

    //visible light frequencies

    const red = 480e12
    const yellow = 530e12
    const green = 600e12
    const blue = 670e12

    // list of metals
    const metals_ev = [4.3, 4.3, 5.1, 4.7, 4.4, 4.3, 4.5, 4.6, 2.4]
    const metals_names = ['Silver', 'Aluminium', 'Gold', 'Copper', 'Tin', 'Lead', 'Tungsten', 'Nickel', 'Sodium']


       
        //function to plot graph
        function graph_ev (z){

            z = z-1

            let w = metals_ev[z]
            let name = metals_names[z]
            let ww = w
            w = w * e

            let f_cutoff = w / h
            
            
            //function to generate points
            function linspace(start, end, num) {
                const array = [];
                const step = (end - start) / (num - 1);
                for (let i = 0; i < num; i++) {
                    array.push(start + (step * i));
                }
                return array;
            }

            //calculating the volts for each frequency
            const frequency1 = linspace(0,f_cutoff,500)
            const volts1 = frequency1.map(f => (h / e) * f - (w / e));

            const frequency2 = linspace(f_cutoff, 3e15, 500);
            const volts2 = frequency2.map(f => (h / e) * f - (w / e));

            //points uptil the threshold
            let trace1 = {
                x: frequency1,
                y: volts1,
                mode: 'lines',
                line: { 
                    width: 2,
                    color: 'magenta',
                    dash: 'dash'
                }
            };

            //points after the threshold
            let trace2 = {
                x: frequency2,
                y: volts2,
                mode: 'lines',
                line: { 
                    width: 2,
                    color: 'magenta',
                }
            };

            let traces = [trace1,trace2]

            let layout = {


                title: { text: `Photoelectric Effect: W = ${ww}eV` },

                autosize: true,
                showlegend: true,
                xaxis: {
                    title: { text: `Frequency/Hz` },
                    showgrid: true,


                },
                yaxis: {
                    title: { text: `Stopping Voltage/Volts` },
                    

                },

                showlegend: false,


                //light frequencies
                shapes: [

                    { type: 'line', x0: f_cutoff, x1: f_cutoff, yref: 'paper', y0: 0, y1: 1, line: { color: 'magenta', dash: 'dash', width: 1.5 } },

                    { type: 'line', x0: red, x1: red, yref: 'paper', y0: 0, y1: 1, line: { color: 'red', width: 1.5 } },
                    { type: 'line', x0: yellow, x1: yellow, yref: 'paper', y0: 0, y1: 1, line: { color: 'yellow', width: 1.5 } },
                    { type: 'line', x0: green, x1: green, yref: 'paper', y0: 0, y1: 1, line: { color: 'green', width: 1.5 } },
                    { type: 'line', x0: blue, x1: blue, yref: 'paper', y0: 0, y1: 1, line: { color: 'blue', width: 1.5 } }
                ]

            };

            let config = {
                responsive: true,
                displayModeBar: false
            }


            Plotly.newPlot('myplot', traces, layout, config);


        }

    //initial graph when website is loaded
    useEffect(() => {
        graph_ev(1);
    }, []);
       
    // implementing photoelectric demo here

    

    let lamda = 500e-9

    let energy = (h * c) /lamda

    //work func in ev
    let work_func = 4.3


    function calc_current(){


    }

    
















    return (
        <>
        <div className='flex flex-auto flex-row mt-4'>

            <div className="w-64 p-4">
                <h4 className='mb-1 font-semibold'>Metal </h4>
                <select defaultValue="1" onChange={(z) => graph_ev(z.target.value)} id="options" className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-0 ">
                    <option value="" disabled selected>Select a metal</option>
                    <option value="1">Silver</option>
                    <option value="2">Aluminium</option>
                    <option value="3">Gold</option>
                    <option value="4">Copper</option>
                    <option value="5">Tin</option>
                    <option value="6">Lead</option>
                    <option value="7">Tungsten</option>
                    <option value="8">Nickel</option>
                    <option value="9">Sodium</option>
                </select>
            </div>
            
            <div className='w-full max-w-[80vh] aspect-1/1' id="myplot" ></div>
        
        </div>

        </>



    );
}