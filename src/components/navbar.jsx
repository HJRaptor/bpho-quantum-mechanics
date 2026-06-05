import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-center gap-8 items-center">
                    {/* Logo / Home */}
                    <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                        ℏome
                    </Link>
                    
                    {/* Navigation Links */}
                    <Link to="/task1" className="text-gray-600 hover:text-blue-600 transition-colors">Task 1</Link>
                    <Link to="/task2" className="text-gray-600 hover:text-blue-600 transition-colors">Task 2</Link>
                    <Link to="/task3" className="text-gray-600 hover:text-blue-600 transition-colors">Task 3</Link>
                    <Link to="/task4" className="text-gray-600 hover:text-blue-600 transition-colors">Task 4</Link>
                    <Link to="/task5" className="text-gray-600 hover:text-blue-600 transition-colors">Task 5</Link>
                    <Link to="/task6" className="text-gray-600 hover:text-blue-600 transition-colors">Task 6</Link>
                    <Link to="/task7" className="text-gray-600 hover:text-blue-600 transition-colors">Task 7</Link>
                    <Link to="/task8" className="text-gray-600 hover:text-blue-600 transition-colors">Task 8</Link>
                    <Link to="/task9" className="text-gray-600 hover:text-blue-600 transition-colors">Task 9</Link>
                    <Link to="/task10" className="text-gray-600 hover:text-blue-600 transition-colors">Task 10</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;