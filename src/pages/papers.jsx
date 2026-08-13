import React, { useEffect } from 'react';
export default function Papers() {




    return (
        <>
            <div className='flex flex-col justify-center m-4 h'>

                <h1 className='text-6xl m-4'>
                    Problem Sheets
                </h1>
                <ul className="list-disc pl-20">
                    <li>
                        <a href="/Research papers/Nuclear_Problem_Sheet.pdf" target="_blank" rel="noopener noreferrer" className='text-2xl hover:text-[#368f8b]'>
                            Nuclear
                        </a>
                    </li>
                    <li>
                        <a href="/Research papers/QM1.pdf" target="_blank" rel="noopener noreferrer" className='text-2xl hover:text-[#368f8b]'>
                            Quantum Mechanics
                        </a>
                    </li>
                    <li>
                        <a href="/Research papers/Particle_Problem_Sheet.pdf" target="_blank" rel="noopener noreferrer" className='text-2xl hover:text-[#368f8b]'>
                            Particle
                        </a>
                    </li>
                </ul>


                <h1 className='text-6xl m-4'>
                    Research Papers
                </h1>
                <ul className="list-disc pl-20">
                    <li>
                        <a href="/Research papers/Hydrogenic Orbitals Paper.pdf" target="_blank" rel="noopener noreferrer" className='text-2xl hover:text-[#368f8b]' >
                            Hydrogenic Orbitals

                        </a>
                    </li>
                    <li>
                        <a href="/Research papers/BPhO_Computational_Challenge_Question_6___Electron_Diffraction.pdf" target="_blank" rel="noopener noreferrer" className='text-2xl hover:text-[#368f8b]' >
                            Task 6 Electron Diffraction Writeup
                        </a>

                    </li>
                    <li>
                        <a href="/Research papers/Quantum_Cryptography.pdf" target="_blank" rel="noopener noreferrer" className='text-2xl hover:text-[#368f8b]' >
                            Quantum Cryptography and the BB84 protocol
                        </a>

                    </li>
                </ul>



            </div>
        </>
    );



}