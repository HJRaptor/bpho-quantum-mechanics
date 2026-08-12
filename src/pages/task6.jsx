import { useRef, useEffect } from "react";
import image1 from '@/assets/ElectronDiffractionGraph.svg';

export default function Task6() {

    const canvasRef = useRef(null)

    function generatePlot(){

        function brightness(d) {
            const out = [];
            for (let i = 0; i<phi.length; i++) {
                const pathDiff = (2 * d * Math.sin(phi[i] / 2)) / lambda;
                const phaseDiff = ((pathDiff % 1 + 1) % 1) * 2 * Math.PI;
                out.push((1 + Math.cos(phaseDiff)) / 8);
            }
            return out;
        }

        const r = 65*10**-3;
        const h = 6.63*10**-34;
        const m = 9.11*10**-31;
        const e = 1.6*10**-19;
        const rings = 250;

        const V = Number(document.getElementById("voltage").value)*1000;

        const lambda = h/Math.sqrt(2*m*e*V);
        const x = [];
        const phi = [];

        for (let i=0; i<rings; i++) {
            const value = (65e-3)*i/(rings - 1);
            x.push(value);
            phi.push(0.5*Math.asin(value/r));
        }

        const d1 = brightness(0.123e-9);
        const d2 = brightness(0.213e-9);
        const totalBrightness = [];

        for (let i=0; i<d1.length; i++) {
            totalBrightness.push(d1[i]+d2[i]);
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const scale = (canvas.width / 2) / r;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        for (let i = 0; i < rings; i++) {
            const radius = x[i] * scale;
            let green = 0.5 + totalBrightness[i];
            green = Math.min(Math.max(green, 0), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgb(0, ${Math.round(green * 255)}, 0)`;
            ctx.stroke();
        }
        ctx.restore();
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
                        Electron Diffraction
                    </div>
                </div>
            </div>
            <div className="col-start-1">
                <label className="text-lg font-medium">Enter voltage (kV) :</label>
                <input type='text'  id='voltage' defaultValue="1" className='border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-100 p-1 text-gray-700'></input>
                <button onClick={generatePlot} className="font-semibold text-xl rounded-md bg-[#7a22f5de] text-white p-4 hover:bg-[#7A22F5]">Generate plot</button>
                <div className="h-6"></div>
                <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
                <div className="h-6"></div>
                <canvas ref={canvasRef} width="800" height="800"/>
            </div>
            <div className="col-start-2">
                <p>The electron diffraction experiment demonstrates the wave nature of electrons, proving de Broglie's Wave-particle duality hypothesis. Electrons are directed at a thin graphite crystal, causing the electrons to diffract. A fluorescent screen detects the electrons, producing concentric rings of maxima and minima.</p>
                <div className="h-6"></div>
                <p>For a detailed explanation for our approach to task 6, see the task 6 write up on the papers page.</p>
                <div className="h-6"></div>
                <p>Left: a computer model of the electron diffraction experiment. Produces the interference pattern based on the accelerating voltage (1-5 kV) of the electron gun, and assumes atomic spacing of graphite.</p>
                <div className="h-6"></div>
                <p>Below: graph of 1/sqrt(V) against sin(phi/2). Each diffraction order is plotted with a different colour, and each spacing is plotted with a different line style. This is used to calculate the atomic spacing of graphite.</p>
                <div className="h-6"></div>
                <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
                <div className="h-6"></div>
                <img src={image1} alt="MATLAB Line Plot" width="800"></img>
                <p>Result of calculation of spacing:</p>
                <p>d1 = 1.2336e-10</p>
                <p>d2 = 2.1319e-10</p>
            </div>
        </div>

        </>
    );


    
}
