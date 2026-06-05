import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"; // shadcn button component

export default function Homepage() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center gap-8 items-center">
            {/* Logo / Home */}
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              Home
            </Link>

            {/* Navigation Links */}
            <Link to="/task1" className="text-gray-600 hover:text-blue-600 transition-colors">
              Task 1
            </Link>

            <Link to="/task2" className="text-gray-600 hover:text-blue-600 transition-colors">
              Task 2
            </Link>

            {/* Added Task 3 link since it exists in your routes */}
            <Link to="/task3" className="text-gray-600 hover:text-blue-600 transition-colors">
              Task 3
            </Link>

            <Link to="/task4" className="text-gray-600 hover:text-blue-600 transition-colors">
              Task 4
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          BPhO 2026 Computational Challenge
        </h1>
      </main>
    </>
  );
}