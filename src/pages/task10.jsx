import React, { useRef, useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import isosurface00 from '@/assets/IsosurfacePlots/isosurface00.json';
import isosurface1_1 from '@/assets/IsosurfacePlots/isosurface1-1.json';
import isosurface10 from '@/assets/IsosurfacePlots/isosurface10.json';
import isosurface11 from '@/assets/IsosurfacePlots/isosurface11.json';
import isosurface2_2 from '@/assets/IsosurfacePlots/isosurface2-2.json';
import isosurface2_1 from '@/assets/IsosurfacePlots/isosurface2-1.json';
import isosurface20 from '@/assets/IsosurfacePlots/isosurface20.json';
import isosurface21 from '@/assets/IsosurfacePlots/isosurface21.json';
import isosurface22 from '@/assets/IsosurfacePlots/isosurface22.json';
import isosurface3_3 from '@/assets/IsosurfacePlots/isosurface3-3.json';
import isosurface3_2 from '@/assets/IsosurfacePlots/isosurface3-2.json';
import isosurface3_1 from '@/assets/IsosurfacePlots/isosurface3-1.json';
import isosurface30 from '@/assets/IsosurfacePlots/isosurface30.json';
import isosurface31 from '@/assets/IsosurfacePlots/isosurface31.json';
import isosurface32 from '@/assets/IsosurfacePlots/isosurface32.json';
import isosurface33 from '@/assets/IsosurfacePlots/isosurface33.json';
import isosurface4_4 from '@/assets/IsosurfacePlots/isosurface4-4.json';
import isosurface4_3 from '@/assets/IsosurfacePlots/isosurface4-3.json';
import isosurface4_2 from '@/assets/IsosurfacePlots/isosurface4-2.json';
import isosurface4_1 from '@/assets/IsosurfacePlots/isosurface4-1.json';
import isosurface40 from '@/assets/IsosurfacePlots/isosurface40.json';
import isosurface41 from '@/assets/IsosurfacePlots/isosurface41.json';
import isosurface42 from '@/assets/IsosurfacePlots/isosurface42.json';
import isosurface43 from '@/assets/IsosurfacePlots/isosurface43.json';
import isosurface44 from '@/assets/IsosurfacePlots/isosurface44.json';

export default function Task10() {

    const plotRef = useRef(null);

    function generatePlot(){

        if (!plotRef.current) return;

        const n = Number(document.getElementById("n").value);
        const l = Number(document.getElementById("l").value);
        const m = Number(document.getElementById("m").value);

        let data = null;

        if (n <= l || m > l || m < -l){
            console.log("Invalid inputs")
        } else if (l == 0){
            data = isosurface00;
        } else if (l == 1){
            if (m == -1){
                data = isosurface1_1;
            }
            if (m == 0){
                data = isosurface10;
            }
            if (m == 1){
                data = isosurface11;
            }
        } else if (l == 2){
            if (m == -2){
                data = isosurface2_2;
            }
            if (m == -1){
                data = isosurface2_1;
            }
            if (m == 0){
                data = isosurface20;
            }
            if (m == 1){
                data = isosurface21;
            }
            if (m == 2){
                data = isosurface22;
            }
        } else if (l == 3){
            if (m == -3){
                data = isosurface3_3;
            }
            if (m == -2){
                data = isosurface3_2;
            }
            if (m == -1){
                data = isosurface3_1;
            }
            if (m == 0){
                data = isosurface30;
            }
            if (m == 1){
                data = isosurface31;
            }
            if (m == 2){
                data = isosurface32;
            }
            if (m == 3){
                data = isosurface33;
            }
        } else if (l == 4){
            if (m == -4){
                data = isosurface4_4;
            }
            if (m == -3){
                data = isosurface4_3;
            }
            if (m == -2){
                data = isosurface4_2;
            }
            if (m == -1){
                data = isosurface4_1;
            }
            if (m == 0){
                data = isosurface40;
            }
            if (m == 1){
                data = isosurface41;
            }
            if (m == 2){
                data = isosurface42;
            }
            if (m == 3){
                data = isosurface43;
            }
            if (m == 4){
                data = isosurface44;
            }
        } else{
            console.log("Invalid inputs")
        }

        if (!data) {
            console.log("Invalid inputs or no data found");
            return;
        }

        const vertices = data.vertices;
        const faces = data.faces;
        const x = vertices.map(v => v[0]);
        const y = vertices.map(v => v[1]);
        const z = vertices.map(v => v[2]);
        const i = faces.map(f => f[0] - 1);
        const j = faces.map(f => f[1] - 1);
        const k = faces.map(f => f[2] - 1);

        const mesh = {
            type: "mesh3d",
            x: x,
            y: y,
            z: z,
            i: i,
            j: j,
            k: k,
            color: "royalblue",
            opacity: 0.6,
            lighting: {
                ambient: 0.4,
                diffuse: 0.8
            }
        };

        const layout = {
            scene: {
                aspectmode: "data",
                xaxis: { title: "x" },
                yaxis: { title: "y" },
                zaxis: { title: "z" }
            },

            margin: {
                l: 0,
                r: 0,
                t: 0,
                b: 0
            }
        };

        const config = {
            responsive: true,
            displaylogo: false
        };

        Plotly.react(plotRef.current, [mesh], layout, config);

    }

    useEffect(() => {
        generatePlot();
    }, []);

    return (
        <>

        <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">
              <div className="col-span-2">
                <div className='flex items-center justify-center my-6 '>
                    <div className='text-3xl font-bold'>
                        Hydrogenic Orbitals
                    </div>
                </div>
            </div>
            <div className="col-start-1">
                <div className='w-full max-w-[80vh] aspect-square' ref={plotRef}></div>
            </div>
            <div className="col-start-2 flex flex-col gap-4">
                <p>A 3d isosurface plot of the probability density of 0.15 for an electron in a hydrogenic atom, given quantum numbers n, l and m. The plot shows the shape of s,p,d,f and g orbitals.</p>
                <p>Conditions for quantum number inputs:</p>
                <ul>
                    <li>n must be greater than or equal to 1</li>
                    <li>l must be greater than 0 and less than n</li>
                    <li>m must be less than or equal to the modulus of l</li>
                    <li>l must be less than 5 (for our model)</li>
                </ul>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium">Quantum number "n" :</label>
                            <input type='text'  id='n' defaultValue="1" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium">Quantum number "l" :</label>
                            <input type='text'  id='l' defaultValue="0" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-lg font-medium">Quantum number "m" :</label>
                            <input type='text'  id='m' defaultValue="0" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                        </div>
                            <button onClick={generatePlot} className='col-span-3 font-semibold text-xl rounded-md bg-[#7a22f5de] text-white p-4 hover:bg-[#7A22F5]'>Generate plot</button>
                    </div>
            </div>
        </div>

        </>
    );

    
}
