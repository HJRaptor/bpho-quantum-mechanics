import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/navbar.jsx';


//pages for each tasks and their paths
import Homepage from './pages/homepage.jsx';
import Task1 from './pages/task1.jsx';
import Task2 from './pages/task2.jsx';
import Task3 from './pages/task3.jsx';
import Task4 from './pages/task4.jsx';
import Task5 from './pages/task5.jsx';
import Task6 from './pages/task6.jsx';
import Task7 from './pages/task7.jsx';
import Task8 from './pages/task8.jsx';
import Task9 from './pages/task9.jsx';
import Task10 from './pages/task10.jsx';
import Papers from './pages/papers.jsx';







export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* to reference in other files by path */}
        <Route path="/" element={<Homepage />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/task3" element={<Task3 />} />
        <Route path="/task4" element={<Task4 />} />
        <Route path="/task5" element={<Task5 />} />
        <Route path="/task6" element={<Task6 />} />
        <Route path="/task7" element={<Task7 />} />
        <Route path="/task8" element={<Task8 />} />
        <Route path="/task9" element={<Task9 />} />
        <Route path="/task10" element={<Task10 />} />
        <Route path="/papers" element={<Papers />} />
      </Routes>
      <Analytics />
    </>
  );
}
