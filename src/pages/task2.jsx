import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';

export default function Task2() {
    const plotRef = useRef(null);
    const simRef = useRef(null);
    const animationRef = useRef(null);
    
    const [isRunning, setIsRunning] = useState(false);


    const initSimulation = () => {
        const N = 1000;
        const T = 100;
        const m = 28.96e-3 / 6.022e23;
        const M = 10 * m;
        const r = 0.16;
        const R = 10 * r;
        const a = 7 * R;
        const C = 1;
        const k_B = 1.38e-23;

        let v = Math.sqrt((3 * k_B * (T + 273)) / m) / 1000;
        let V = Math.sqrt((3 * k_B * (T + 273)) / M) / 1000;

        const Kn = 15;
        const tmax = 200;
        const dt = 0.01 * Kn * r / v;

        let X = 0.5 * a;
        let Y = 0.5 * a;
        let thetaLarge = 2 * Math.PI * Math.random();
        let Vx = V * Math.cos(thetaLarge);
        let Vy = V * Math.sin(thetaLarge);

        let x = new Array(N);
        let y = new Array(N);
        let vx = new Array(N);
        let vy = new Array(N);

        for (let n = 0; n < N; n++) {
            let d = 0;
            while (d < R + r) {
                x[n] = r + Math.random() * (a - 2 * r);
                y[n] = r + Math.random() * (a - 2 * r);
                const dx = X - x[n];
                const dy = Y - y[n];
                d = Math.sqrt(dx * dx + dy * dy);
            }
            let thetaSmall = 2 * Math.PI * Math.random();
            vx[n] = v * Math.cos(thetaSmall);
            vy[n] = v * Math.sin(thetaSmall);
        }

        const numPoints = 500; 
        const xcOffset = [];
        const ycOffset = [];
        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * 2 * Math.PI;
            xcOffset.push(R * Math.cos(angle));
            ycOffset.push(R * Math.sin(angle));
        }

        return {
            N, m, M, r, R, a, C, v, dt, tmax, Kn,
            X, Y, Vx, Vy, x, y, vx, vy, XX: [X], YY: [Y], t: 0, tt: 0,
            xcOffset, ycOffset
        };
    };

    function ball_displacement(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
        return [[dx / d, dy / d], d];
    }

    function bounce(x1, y1, x2, y2, ux1, uy1, ux2, uy2, M1, M2, R1, R2, C) {
        const [dhat, d] = ball_displacement(x1, y1, x2, y2);
        if (d <= R1 + R2) {
            const delta = (R1 + R2 - d) / 2;
            x1 -= delta * dhat[0];
            y1 -= delta * dhat[1];
            x2 += delta * dhat[0];
            y2 += delta * dhat[1];

            const rvx = ux2 - ux1;
            const rvy = uy2 - uy1;
            const dotProduct = rvx * dhat[0] + rvy * dhat[1];

            if (dotProduct < 0) {
                const V_x = (M1 * ux1 + M2 * ux2) / (M1 + M2);
                const V_y = (M1 * uy1 + M2 * uy2) / (M1 + M2);

                ux1 = V_x - C * (ux1 - V_x);
                uy1 = V_y - C * (uy1 - V_y);
                ux2 = V_x - C * (ux2 - V_x);
                uy2 = V_y - C * (uy2 - V_y);
            }
        }
        return [ux1, uy1, ux2, uy2, x1, y1, x2, y2];
    }

    useEffect(() => {
        const initialData = initSimulation();
        simRef.current = initialData;

        const layout = {
            autosize: true,
            margin: { l: 20, r: 20, t: 50, b: 20 },
            title: { text: "Brownian Motion Simulation :  t = 0.0 ps" },
            xaxis: { range: [0, initialData.a], fixedrange: true, showticklabels: false, showgrid: false, zeroline: false },
            yaxis: { range: [0, initialData.a], fixedrange: true, showticklabels: false, showgrid: false, zeroline: false },
            showlegend: false,
            shapes: [{
                type: 'rect', x0: 0, y0: 0, x1: initialData.a, y1: initialData.a,
                line: { color: 'black', width: 3 }
            }]
        };

        Plotly.newPlot(plotRef.current, [
            { x: [], y: [], mode: 'markers', marker: { color: 'blue', size: 4 } },           
            { x: [], y: [], mode: 'lines', line: { color: 'red', width: 2 } },               
            { x: [], y: [], mode: 'lines', line: { color: 'red', width: 1 } },               
            { x: [], y: [], mode: 'markers', marker: { color: 'red', size: 6 } }             
        ], layout, { responsive: true, displayModeBar: false });

        const initialCircleX = initialData.xcOffset.map(val => val + initialData.X);
        const initialCircleY = initialData.ycOffset.map(val => val + initialData.Y);
        Plotly.update(plotRef.current, {
            x: [initialData.x, initialCircleX, initialData.XX, [initialData.X]],
            y: [initialData.y, initialCircleY, initialData.YY, [initialData.Y]]
        });

        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    const tick = () => {
        const sim = simRef.current;
        if (!sim) return;

        if (sim.t >= sim.tmax) {
            setIsRunning(false);
            return;
        }

        for (let step = 0; step < 4; step++) { 
            if (sim.t + sim.dt > sim.tmax) {
                sim.t = sim.tmax; 
                break;
            }

            sim.t += sim.dt;
            sim.tt += sim.dt;

            sim.X += sim.Vx * sim.dt;
            sim.Y += sim.Vy * sim.dt;

            for (let n = 0; n < sim.N; n++) {
                sim.x[n] += sim.vx[n] * sim.dt;
                sim.y[n] += sim.vy[n] * sim.dt;

                const res = bounce(sim.X, sim.Y, sim.x[n], sim.y[n], sim.Vx, sim.Vy, sim.vx[n], sim.vy[n], sim.M, sim.m, sim.R, sim.r, sim.C);
                sim.Vx = res[0]; sim.Vy = res[1];
                sim.vx[n] = res[2]; sim.vy[n] = res[3];
                sim.X = res[4]; sim.Y = res[5];
                sim.x[n] = res[6]; sim.y[n] = res[7];
            }

            if (sim.tt > (sim.Kn * sim.r) / sim.v) {
                sim.tt = 0;
                for (let n = 0; n < sim.N; n++) {
                    let theta = 2 * Math.PI * Math.random();
                    sim.vx[n] = sim.v * Math.cos(theta);
                    sim.vy[n] = sim.v * Math.sin(theta);
                }
            }
        }

        sim.XX.push(sim.X);
        sim.YY.push(sim.Y);

        const circleX = sim.xcOffset.map(val => val + sim.X);
        const circleY = sim.ycOffset.map(val => val + sim.Y);

        Plotly.animate(plotRef.current, {
            data: [
                { x: sim.x, y: sim.y },       
                { x: circleX, y: circleY },   
                { x: sim.XX, y: sim.YY },
                { x: [sim.X], y: [sim.Y] } 
            ]
        }, {
            transition: { duration: 0 },
            frame: { duration: 0, redraw: false }
        });

        Plotly.relayout(plotRef.current, {
            title: { text: `Brownian Motion Simulation :  t = ${sim.t.toFixed(1)} ps` }
        });

        animationRef.current = requestAnimationFrame(tick);
    };

    const generatePlot = () => {
        if (isRunning) {
            cancelAnimationFrame(animationRef.current);
            setIsRunning(false);
        } else {
            if (simRef.current && simRef.current.t < simRef.current.tmax) {
                setIsRunning(true);
                animationRef.current = requestAnimationFrame(tick);
            }
        }
    };

    const resetSimulation = () => {
        cancelAnimationFrame(animationRef.current);
        setIsRunning(false);

        const freshData = initSimulation();
        simRef.current = freshData;

        const initialCircleX = freshData.xcOffset.map(val => val + freshData.X);
        const initialCircleY = freshData.ycOffset.map(val => val + freshData.Y);

        // Explicitly maintain the layout configuration on reset so the title stays visible
        const currentLayout = {
            autosize: true,
            margin: { l: 20, r: 20, t: 50, b: 20 },
            title: { text: "Brownian Motion Simulation :  t = 0.0 ps" },
            xaxis: { range: [0, freshData.a], fixedrange: true, showticklabels: false, showgrid: false, zeroline: false },
            yaxis: { range: [0, freshData.a], fixedrange: true, showticklabels: false, showgrid: false, zeroline: false },
            showlegend: false,
            shapes: [{
                type: 'rect', x0: 0, y0: 0, x1: freshData.a, y1: freshData.a,
                line: { color: 'black', width: 3 }
            }]
        };

        Plotly.update(plotRef.current, {
            x: [freshData.x, initialCircleX, freshData.XX, [freshData.X]],
            y: [freshData.y, initialCircleY, freshData.YY, [freshData.Y]]
        }, currentLayout);
    };

    return (
        <>
            <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">

                <div className="col-span-2">
                    <div className='flex items-center justify-center my-6 '>
                        <div className='text-3xl font-bold'>
                            Brownian motion
                        </div>
                    </div>
                </div>
                <div className="col-start-1 flex flex-col gap-2">
                    <div className='w-full max-w-[82vh] aspect-square' ref={plotRef} ></div>
                </div>


                <div className="col-start-2 flex flex-col gap-2">
                    <p>
                        Brownian motion describes the random movement of a heavy suspended particle due to collisions with a surrounding gas or fluid. It was first discovered by Robert Brown in 1827 through the random jagged movement of pollen grains inside water, and the mathematical proof was later written by Albert Einstein in 1905.
                    </p>
                    <p>
                        The smaller particles are modelled using a random walk function, as seen in task 1. The motion of the larger red particle is modelled by applying the conservation of momentum in the zero-momentum frame for each collision.
                    </p>
                    <div className='m-4'></div>
                    <button onClick={generatePlot} className='col-span-3 font-semibold text-xl rounded-md bg-[#7a22f5de] text-white p-4 hover:bg-[#7A22F5]'>{isRunning ? "Stop simulation" : "Start simulation"}</button>
                    <button onClick={resetSimulation} className='col-span-3 font-semibold text-xl rounded-md bg-[#7a22f5de] text-white p-4 hover:bg-[#7A22F5]'>Reset Simulation</button>
                </div>
            </div>


        </>
    );
}