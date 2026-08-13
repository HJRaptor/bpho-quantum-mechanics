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
                <p className='font-sans font-light text-xl'>These tasks were initially completed in MATLAB, due to its suitability for mathematical calculations, and then converted to JavaScript and HTML to collate the tasks in one place and provide a user interface.</p>
                <div className='my-2'></div>
                <p className='font-sans font-light text-xl'>As an extension for the challenge, we have written a scientific paper explaining our approach to task 6, as we felt it was most suitable for emulating a scientific experiment and presenting results. We have also written a paper looking into hydrogenic orbitals and the quantum model of the atom. Additionally, we have written papers with detailed solutions for the nuclear, particle and quantum 1 problem sheets.</p>
                <div className='my-2'></div>
                {/* <p className='font-sans font-light text-xl'>As part of the competition, we created a short video explaining our work, which can be accessed below:</p>
                <div className='my-2'></div>
                <p className='font-sans font-light text-xl'>[insert video link]</p> */}
                <div className='my-2'></div>
                
                <p className='font-sans font-light text-xl'>The code for this website can be accessed in the GitHub repository linked below:</p>
                <div className='my-2'></div>
                <a className='font-sans font-light text-xl hover:underline' href='https://github.com/HJRaptor/bpho-quantum-mechanics'>BPhO Computational Challenge 2026</a>
            </main>
            


            
    
        </>
    );
}