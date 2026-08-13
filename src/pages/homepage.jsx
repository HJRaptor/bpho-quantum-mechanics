import React, { useEffect, useRef, useState } from 'react';

export default function Homepage() {

   
    return (
        <>


            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 text-left">
                <h1 className="text-8xl font-extrabold tracking-tight mb-6">
                    BPhO 2026 Computational Challenge
                </h1>
                <h1 className='text-8xl font-extrabold tracking-tight mb-6 '>Quantum Mechanics</h1>
                <h1 className='text-right text-3xl my-5  font-medium '> - Abhinav & Harshit</h1>
                <div className='py-10'></div>
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