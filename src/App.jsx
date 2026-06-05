import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';


//pages for each tasks and their paths
import Homepage from './pages/homepage.jsx';
import Task1 from './pages/task1.jsx';
import Task2 from './pages/task2.jsx';
import Task3 from './pages/task3.jsx';
import Task4 from './pages/task4.jsx';
import Task5 from './pages/task5.jsx';
import Task7 from './pages/task7.jsx';


// shadcdn ui components
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"





export default function App() {
  return (
    <Routes>
      {/* to reference in other files by path */}
      <Route path="/" element={<Homepage />} />
      <Route path="/task1" element={<Task1 />} />
      <Route path="/task2" element={<Task2 />} />
      <Route path="/task3" element={<Task3 />} />
      <Route path="/task4" element={<Task4 />} />
      <Route path="/task5" element={<Task5 />} />
      <Route path="/task7" element={<Task7 />} />
    </Routes>
  );
}
