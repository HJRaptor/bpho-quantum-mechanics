import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (

        <nav className=' bg-[#7A22F5] text-white w-full'>
            <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='justify-start text-4xl font-bold'>
                        <Link to="/" className="transition-colors hover:underline underline-offset-6"> ℏome</Link>
                    </div>
                    <div className='justify-center grid grid-cols-10 grid-rows-1 gap-4'>
                        <Link to="/task1" className="transition-colors hover:underline underline-offset-6"> Task 1</Link>
                        <Link to="/task2" className="transition-colors hover:underline underline-offset-6"> Task 2</Link>
                        <Link to="/task3" className="transition-colors hover:underline underline-offset-6"> Task 3</Link>
                        <Link to="/task4" className="transition-colors hover:underline underline-offset-6"> Task 4</Link>
                        <Link to="/task5" className="transition-colors hover:underline underline-offset-6"> Task 5</Link>
                        <Link to="/task6" className="transition-colors hover:underline underline-offset-6"> Task 6</Link>
                        <Link to="/task7" className="transition-colors hover:underline underline-offset-6"> Task 7</Link>
                        <Link to="/task8" className="transition-colors hover:underline underline-offset-6"> Task 8</Link>
                        <Link to="/task9" className="transition-colors hover:underline underline-offset-6"> Task 9</Link>
                        <Link to="/task10" className="transition-colors hover:underline underline-offset-6"> Task 10</Link>
                    </div>
                    <div className='justify-end'>
                        Papers
                    </div>

                </div>

            </div>

        </nav>




    );
};

export default Navbar;