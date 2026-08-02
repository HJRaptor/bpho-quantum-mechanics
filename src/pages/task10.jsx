import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
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
            flatshading: false,
            lighting: {
                ambient: 0.4,
                diffuse: 0.8,
                specular: 0.5,
                roughness: 0.4,
                fresnel: 0.2
            },
            lightposition: {
                x: 100,
                y: 200,
                z: 300
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

    return (
        <>
        
        <div className='flex flex-col gap-4 mt-4'>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-col'>
                    <h4 className='mb-1 font-semibold'>Quantum number "n" :</h4>
                    <input type='text'  id='n' defaultValue="1" className='px-2 py-1 border rounded-md focus:outline-none focus:ring-0'></input>
                </div>
                <div className='flex flex-col'>
                    <h4 className='mb-1 font-semibold'>Quantum number "l" :</h4>
                    <input type='text'  id='l' defaultValue="0" className='px-2 py-1 border rounded-md focus:outline-none focus:ring-0'></input>
                </div>
                <div className='flex flex-col'>
                    <h4 className='mb-1 font-semibold'>Quantum number "m" :</h4>
                    <input type='text'  id='m' defaultValue="0" className='px-2 py-1 border rounded-md focus:outline-none focus:ring-0'></input>
                </div>
                <div className='flex items-end'>
                    <Button onClick={generatePlot} className='rounded-md '>Generate plot</Button>
                </div>
            </div>
        </div>
        <div ref={plotRef} style={{ width: "100%", height: "700px" }}></div>

        </>
    );

    
}
