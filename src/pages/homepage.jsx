import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // shadcn button component

export default function Homepage() {

    //implementing photoelectric effect demo logic

    const metals_ev = [4.3, 4.3, 5.1, 4.7, 4.4, 4.3, 4.5, 4.6, 2.4]
    const metals_names = ['Silver', 'Aluminium', 'Gold', 'Copper', 'Tin', 'Lead', 'Tungsten', 'Nickel', 'Sodium']

    const H = 6.63 * 10**(-34)
    const C = 3 * 10**8
    const e = 1.6 * 10**(-19)
    const metal_plate_area = 1 * 10**(-4)

    const default_metal = metals_names[0]
    const default_wf = metals_ev[0]


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



    }


    //variables 
    const [intensity, setIntensity] = useState(100)//W/m^2   
    const [wavelength, setWavelength] = useState(550)//nm
    const [cMetal, setSelectedMetal] = useState(default_metal)
    const [cCurrent, setDisplayedCurrent] = useState(0)//A

    
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
        stateRef.current = {
            intensity,
            wavelength,
            workFunction: getWorkFunction(selectedMetal),
            metalName: selectedMetal,
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
        </>
    );
}