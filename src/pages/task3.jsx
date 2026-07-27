import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Navbar from '@/components/navbar';
import image1 from '@/assets/PlanckSpectrum.svg';
import image2 from '@/assets/EinsteinsModel.svg';

export default function Task3() {




    return (
        <>    
    <body>
        <img src={image1} alt="MATLAB Line Plot" width="600"></img>
        <hr className="my-8 border-gray-200" />
        <img src={image2} alt="MATLAB Line Plot" width="600"></img>
    </body>
        </>
    );



}