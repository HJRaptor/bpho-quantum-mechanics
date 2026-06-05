import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();
    
    return (
        <nav className="bg-white">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-center gap-8 items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-gray-800">
                        Home
                    </Link>
                    
                    {/* Navigation Links */}
                    <Link 
                        to="/task1" 
                        className={`transition font-medium ${
                            location.pathname === '/task1' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Task 1
                    </Link>
                    
                    <Link 
                        to="/task2" 
                        className={`transition font-medium ${
                            location.pathname === '/task2' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Task 2
                    </Link>
                    
                    <Link 
                        to="/about" 
                        className={`transition font-medium ${
                            location.pathname === '/about' 
                                ? 'text-blue-600 border-b-2 border-blue-600' 
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        About
                    </Link>
                </div>
            </div>
        </nav>
    );
}