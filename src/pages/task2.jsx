import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist';
import { Button } from "@/components/ui/button";

export default function Task2() {
    const plotRef = useRef(null);
    const simRef = useRef(null);
    const animationRef = useRef(null);
    
    const [isRunning, setIsRunning] = useState(false);

    // 1. Centralized Initialization Function
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

    // Helper math/physics functions extracted out of the loop for performance
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

        // Initial paint
        const initialCircleX = initialData.xcOffset.map(val => val + initialData.X);
        const initialCircleY = initialData.ycOffset.map(val => val + initialData.Y);
        Plotly.update(plotRef.current, {
            x: [initialData.x, initialCircleX, initialData.XX, [initialData.X]],
            y: [initialData.y, initialCircleY, initialData.YY, [initialData.Y]]
        });

        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    // 2. Continuous Loop Engine (Read static current state tracking definitions smoothly)
    const tick = () => {
        const sim = simRef.current;
        if (!sim) return;

        // Strict validation: stop loop completely if time has reached or exceeded max limits
        if (sim.t >= sim.tmax) {
            setIsRunning(false);
            return;
        }

        for (let step = 0; step < 4; step++) { 
            // FIX: If a sub-step is going to push us over tmax, break out immediately
            if (sim.t + sim.dt > sim.tmax) {
                sim.t = sim.tmax; // Clamp exactly to 200.0
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
            // Ensure we aren't trying to run an already completed simulation
            if (simRef.current && simRef.current.t < simRef.current.tmax) {
                setIsRunning(true);
                animationRef.current = requestAnimationFrame(tick);
            }
        }
    };

    const resetSimulation = () => {
        cancelAnimationFrame(animationRef.current);
        setIsRunning(false);

        // Generate brand new simulation dataset properties
        const freshData = initSimulation();
        simRef.current = freshData;

        const initialCircleX = freshData.xcOffset.map(val => val + freshData.X);
        const initialCircleY = freshData.ycOffset.map(val => val + freshData.Y);

        // Instantly force UI paint update to absolute zero frame bounds
        Plotly.update(plotRef.current, {
            x: [freshData.x, initialCircleX, freshData.XX, [freshData.X]],
            y: [freshData.y, initialCircleY, freshData.YY, [freshData.Y]]
        });

        Plotly.relayout(plotRef.current, {
            title: { text: `Brownian Motion Simulation :  t = 0.0 ps` }
        });
    };

    return (
        <div className="w-full flex flex-col justify-start items-start p-6 gap-4">
            {/* Graph Node */}
            <div className="w-full max-w-[600px] aspect-square flex-shrink-0">
                <div ref={plotRef} className="w-full h-full" id="myplot" />
            </div>

            {/* Sub-Graph Row Button Array Placement */}
            <div className="flex flex-row items-center gap-3 w-full max-w-[600px]">
                <Button onClick={generatePlot} className="rounded-md">
                    {isRunning ? "Stop simulation" : "Start simulation"}
                </Button>
                
                <Button onClick={resetSimulation} variant="outline" className="rounded-md">
                    Reset Simulation
                </Button>
            </div>
        </div>
    );
}