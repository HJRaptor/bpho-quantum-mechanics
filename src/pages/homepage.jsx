import React, { useEffect, useRef, useState } from 'react';

export default function Homepage() {

    //implementing photoelectric effect demo logic

    const metals_ev = [4.3, 4.3, 5.1, 4.7, 4.4, 4.3, 4.5, 4.6, 2.4]
    const metals_names = ['Silver', 'Aluminium', 'Gold', 'Copper', 'Tin', 'Lead', 'Tungsten', 'Nickel', 'Sodium']

    const H = 6.63 * 10**(-34)
    const C = 3 * 10**8
    const e = 1.6 * 10**(-19)
    const metal_plate_area = 1 * 10**(-4)
    const electronm = 9.109e-31

    const default_metal = metals_names[0]
    const default_wf = metals_ev[0]


    function getKE() {
        const photonEv = (H*C)/(wavelength*1e-9)/e
        const workEv = calcwf(cMetal)/e
        const ke = photonEv - workEv
        if (ke > 0) {
            return `${ke.toFixed(2)} eV`;
        } else {
            return '0 eV';
        }

    }


    //maps wavelengths of light to a colour code
    function wavelengthtorgb(lamda){
        let r = 0
        let g = 0
        let b = 0

        if (lamda >= 380 && lamda < 440) {
            r = -(lamda - 440) / (440 - 380)
            g = 0
            b = 1
        } else if (lamda >= 440 && lamda < 490) {
            r = 0
            g = (lamda - 440) / (490 - 440)
            b = 1
        } else if (lamda >= 490 && lamda < 510) {
            r = 0
            g = 1
            b = -(lamda - 510) / (510 - 490)
        } else if (lamda >= 510 && lamda < 580) {
            r = (lamda - 510) / (580 - 510)
            g = 1
            b = 0
        } else if (lamda >= 580 && lamda < 645) {
            r = 1
            g = -(lamda - 645) / (645 - 580)
            b = 0
        } else if (lamda >= 645 && lamda <= 780) {
            r = 1
            g = 0
            b = 0
        } else {
            
            return '#808080'

            
        }

        //correct for intensity of colours
        let factor = 1;
        if (lamda >= 380 && lamda < 420) {
            factor = 0.3 + 0.7 * (lamda - 380) / (420 - 380)
        } else if (lamda >= 420 && lamda < 701) {
            factor = 1.0
        } else if (lamda >= 701 && lamda <= 780) {
            factor = 0.3 + 0.7 * (780 - lamda) / (780 - 700)
        }


        function rgbtohex(r, g, b, factor) {


            function tohex(colorValue) {

                const normalisedvalue = Math.round(colorValue * factor * 255)

                const hexstring = normalisedvalue.toString(16)

                return hexstring.padStart(2, '0')
            }

            // 4. Combine the channels with a leading hash symbol
            const red = tohex(r)
            const green = tohex(g)
            const blue = tohex(b)

            return `#${red}${green}${blue}`
        }


        return rgbtohex(r, g, b, factor);
    }


    //variables 
    const [intensity, setIntensity] = useState(100)//W/m^2   
    const [wavelength, setWavelength] = useState(550)//nm
    const [cMetal, setcMetal] = useState(default_metal)
    const [cCurrent, setDisplayedCurrent] = useState(0)//A

    

    //returns work function of a given metal
    function calcwf(metal){
        let index = metals_names.indexOf(metal)
        let wf = metals_ev[index] * e
        return wf // joules

    }


    const stateRef = useRef({
        intensity: 100,
        wavelength: 550,
        wf: calcwf(default_metal),
        metal: default_metal,
    });

    const canvasRef = useRef(null)
    const photonsRef = useRef([])
    const electronsRef = useRef([])


    useEffect(() => {


        function physics(intensity, wavelength, workfunc, area = metal_plate_area){

            if (wavelength <= 0) return null

            const wavelengthnm = wavelength*1e-9
            const photonE = (H*C)/wavelengthnm
            const photoneV = photonE/e
            const workfunceV = workfunc / e
            let above_threshold = false
            let ke = 0
            let current = 0
            //P = IA
            const power_metal = intensity * area

            //n = Pt/E
            const photonsps = power_metal/photonE
            
            
            //ke = 0.5mv^2
            //sqrt(2ke/m) = v
            let electron_speed = 0

            if (photoneV >= workfunceV){
                above_threshold = true
                ke = photonE - workfunc
                const keEv = ke/e
                //Q = It
                //en = I
                current = photonsps * e
                //display current in micro/nano amps for better readability, convert here, or just convert in the html display element?

                electron_speed = Math.sqrt((2*ke)/electronm)
            }else{
                above_threshold = false
            }
            
            return{
                wavelengthnm,
                photonE,
                photoneV,
                above_threshold,
                ke,
                current,
                power_metal,
                photonsps,
                electron_speed


            }

            


        }



        stateRef.current = {
            intensity,
            wavelength,
            wf: calcwf(cMetal),
            metal: cMetal,
        }
    }, [intensity, wavelength, cMetal])







    return (
        <>


            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 text-left">
                <h1 className="text-8xl font-extrabold tracking-tight mb-6">
                    BPhO 2026 Computational Challenge
                </h1>
                <h1 className='text-8xl font-extrabold tracking-tight mb-6 '>Quantum Mechanics</h1>
                <h1 className='text-right text-3xl my-5  font-medium '> - Abhinav & Harshit</h1>
                <p className='font-mono font-semibold'>This website contains our submission for the BPhO Computational Challenge 2026, where the theme of this year’s challenge is Quantum. As part of the challenge we have completed 10 tasks, including plotting graphs of quantum phenomena and creating computer models demonstrating quantum phenomena, applying concepts ranging from Brownian motion, the photoelectric effect, electron diffraction, Compton scattering and hydrogenic atoms.</p>
                <p className='font-mono font-semibold'>These tasks were initially completed in MATLAB, due to its suitability for mathematical calculations, and then converted to JavaScript and HTML to collate the tasks in one place and provide a user interface.</p>
                <p className='font-mono font-semibold'>As an extension for the challenge, we have written a scientific paper explaining our approach to task 6, as we felt it was most suitable for emulating a scientific experiment and presenting results. We have also written a paper looking into hydrogenic orbitals and the quantum model of the atom. Additionally, we have written papers with detailed solutions for the nuclear, particle, quantum 1 and quantum 2 problem sheets.</p>
                <p className='font-mono font-semibold'>As part of the competition, we created a short video explaining our work, which can be accessed below:</p>
                <p className='font-mono font-semibold'>[insert video link]</p>
                <p className='font-mono font-semibold'>The code for this website can be accessed in the GitHub repository linked below:</p>
                <p className='font-mono font-semibold'>[insert GitHub link]</p>
            </main>
            


            
            <div className='flex flex-col'>
                {/* canvas to hold animation */}
                <div className='flex'>

                    <canvas ref={canvasRef} width={800} height={600} className='w-full'></canvas>


                </div>
                {/* Intensity slider */}
                <div className='flex flex-col p-4'>
                    <label className="font-semibold  mb-1">Intensity</label>

                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={intensity}
                        className="slider w-full cursor-pointer mb-1"
                        id="intensity"
                        onChange={(e) => setIntensity(Number(e.target.value))}
                    />
                </div>

                {/* Wavelength slider */}
                <div className='flex flex-col p-4'>
                    <label className="font-semibold  mb-1">Wavelength </label>

                    <input
                        type="range"
                        min="0"
                        max="1000"
                        value={wavelength}
                        className="slider w-full cursor-pointer mb-1"
                        id="wavelength"
                        onChange={(e) => setWavelength(Number(e.target.value))}
                    />
                </div>

                {/* Metal selector for the animation */}
                <div className="flex flex-col gap-2 m-4">
                    <label className='mb-1 text-xl font-semibold mx-1'>Metal : </label>
                    <select
                        value={metals_names.indexOf(cMetal) + 1}
                        onChange={(e) => setcMetal(metals_names[parseInt(e.target.value) - 1])}
                        id="options"
                        className="w-64 bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-0"
                    >
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



                {/* Calculate and display photon energy for a given wavelength */}
                <div className="flex justify-between m-4">
                    <p className="text-md font-semibold">Photon Energy: {((H * C) / (wavelength * 1e-9) / e).toFixed(2)} eV</p>
                </div>


                {/* Display for the work function */}
                <div className="flex justify-between m-4">
                    <p className="text-md font-semibold">Work Function: {(calcwf(cMetal)/e).toFixed(2)} eV</p>
                </div>




                <div className="flex justify-between m-4">
                    <p className="text-md font-semibold">Kinetic Energy: {getKE()}</p>

                        
                </div>

            </div>
        </>
    );
}