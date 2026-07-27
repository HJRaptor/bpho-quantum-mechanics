import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import image1 from '@/assets/ElectronRecoilAngle.svg';
import image2 from '@/assets/ElectronRecoilSpeed.svg';
import image3 from '@/assets/FractionalWavelength.svg';

export default function Task9() {

    return (
        <>
    <body>
        <img src={image1} alt="MATLAB Line Plot" width="600"></img>
        <hr className="my-8 border-gray-200" />
        <img src={image2} alt="MATLAB Line Plot" width="600"></img>
        <hr className="my-8 border-gray-200" />
        <img src={image2} alt="MATLAB Line Plot" width="600"></img>
    </body>
        </>
    );

    
}
