import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export default function Homepage({ }) {
 

  return (
    <main>
      <title>Homepage</title>
      <h1>Homepage</h1>
      <p>This is the homepage screen.</p>
      <Link to="/">
        <Button>Back to App</Button>
       </Link>
      
    </main>
  );
}
