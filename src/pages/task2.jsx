import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

export default function Task2() {
    const plotRef = useRef(null);
    const simRef = useRef(null);

    // 1. Initialize Constants (Done once on component mount)
    useEffect(() => {
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

        // Large particle initial setup
        let X = 0.5 * a;
        let Y = 0.5 * a;
        let thetaLarge = 2 * Math.PI * Math.random();
        let Vx = V * Math.cos(thetaLarge);
        let Vy = V * Math.sin(thetaLarge);

        // Small particles initial setup
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

        // Trails
        let XX = [X];
        let YY = [Y];
        let t = 0;
        let tt = 0;

        // Store inside ref to access in animation frame
        simRef.current = {
            N, m, M, r, R, a, C, v, dt, tmax, Kn,
            X, Y, Vx, Vy, x, y, vx, vy, XX, YY, t, tt
        };

        // Helper functions
        function ball_displacement(x1, y1, x2, y2) {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
            return [[dx / d, dy / d], d];
        }

        function bounce(x1, y1, x2, y2, ux1, uy1, ux2, uy2, M1, M2, R1, R2) {
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

        // Initial Plot Setup
        const layout = {
            autosize: true,
            xaxis: { range: [0, a], fixedrange: true },
            yaxis: { range: [0, a], fixedrange: true },
            showlegend: false,
            shapes: [{
                type: 'rect', x0: 0, y0: 0, x1: a, y1: a,
                line: { color: 'black', width: 3 }
            }]
        };

        Plotly.newPlot(plotRef.current, [
            { x: [], y: [], mode: 'markers', marker: { color: 'blue', size: 4 } }, // Small particles
            { x: [], y: [], mode: 'markers', marker: { color: 'red', size: 16 } }, // Large particle
            { x: [], y: [], mode: 'lines', line: { color: 'red', width: 1 } }      // Trail
        ], layout, { responsive: true, displayModeBar: false });

        let animationFrameId;

        // Loop Runner
        const tick = () => {
            const sim = simRef.current;
            if (sim.t > sim.tmax) return; // Stop when simulation finishes

            // 1. Update Positions (Simulating sub-steps for better physics resolution)
            for (let step = 0; step < 5; step++) { // Sub-stepping prevents clipping
                sim.t += sim.dt;
                sim.tt += sim.dt;

                sim.X += sim.Vx * sim.dt;
                sim.Y += sim.Vy * sim.dt;

                for (let n = 0; n < sim.N; n++) {
                    sim.x[n] += sim.vx[n] * sim.dt;
                    sim.y[n] += sim.vy[n] * sim.dt;

                    // Handle collision
                    const res = bounce(sim.X, sim.Y, sim.x[n], sim.y[n], sim.Vx, sim.Vy, sim.vx[n], sim.vy[n], sim.M, sim.m, sim.R, sim.r);
                    sim.Vx = res[0]; sim.Vy = res[1];
                    sim.vx[n] = res[2]; sim.vy[n] = res[3];
                    sim.X = res[4]; sim.Y = res[5];
                    sim.x[n] = res[6]; sim.y[n] = res[7];
                }

                // Randomize directions on interval
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

            // 2. Dynamic UI Update
            Plotly.animate(plotRef.current, {
                data: [
                    { x: sim.x, y: sim.y },
                    { x: [sim.X], y: [sim.Y] },
                    { x: sim.XX, y: sim.YY }
                ],
                layout: { title: { text: `Brownian Motion Simulation: t = ${sim.t.toFixed(1)} ps` } }
            }, {
                transition: { duration: 0 },
                frame: { duration: 0, redraw: false }
            });

            animationFrameId = requestAnimationFrame(tick);
        };

        // Start Loop
        animationFrameId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div ref={plotRef} className="w-full max-w-[600px] aspect-square" />
        </div>
    );
}