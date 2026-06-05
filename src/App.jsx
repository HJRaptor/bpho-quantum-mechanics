import React from 'react';
import { Button } from "@/components/ui/button";
import { Link, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import Task1 from './pages/task1.jsx';


export default function App() {


  return (
  <Routes>
    <Route
      path="/"
      element={
        <main>
          <title>App</title>
          <h1>BPhO 2026 Computational Challenge</h1>
          <div>
            <h1>BPHO1</h1>
            <Link to="/homepage">
              <Button>Go to Homepage</Button>
            </Link>
            <Link to="/task1">
              <Button>Go to Task 1</Button>
            </Link>
          </div>
        </main>
      }
    />
    <Route path="/homepage" element={<Homepage />} />
    <Route path="/task1" element={<Task1 />} />
  </Routes>
);
}