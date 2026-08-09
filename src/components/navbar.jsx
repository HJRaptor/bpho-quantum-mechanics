import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {

    const currentpage = ({ isActive }) => {
        const baseStyle = "transition-all hover:underline underline-offset-8";
        return isActive ? `${baseStyle} underline font-semibold` : baseStyle;
    };



    return (
        
        
        

        <nav className=' bg-[#7A22F5] text-white w-full'>
            <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='justify-start text-4xl font-bold'>
                        <Link to="/" className="transition-all hover:drop-shadow-sm hover:drop-shadow-white/50"> ℏome</Link>
                    </div>
                    <div className='justify-center grid grid-cols-10 grid-rows-1 gap-4'>
                        <NavLink to="/task1" className={currentpage}> Task 1</NavLink>
                        <NavLink to="/task2" className={currentpage}> Task 2</NavLink>
                        <NavLink to="/task3" className={currentpage}> Task 3</NavLink>
                        <NavLink to="/task4" className={currentpage}> Task 4</NavLink>
                        <NavLink to="/task5" className={currentpage}> Task 5</NavLink>
                        <NavLink to="/task6" className={currentpage}> Task 6</NavLink>
                        <NavLink to="/task7" className={currentpage}> Task 7</NavLink>
                        <NavLink to="/task8" className={currentpage}> Task 8</NavLink>
                        <NavLink to="/task9" className={currentpage}> Task 9</NavLink>
                        <NavLink to="/task10" className={currentpage}> Task 10</NavLink>
                        
                    </div>
                    <div className='justify-end'>
                        <NavLink to="/papers" className={currentpage}> Papers</NavLink>
                    </div>

                </div>

            </div>

        </nav>




    );
};

export default Navbar;