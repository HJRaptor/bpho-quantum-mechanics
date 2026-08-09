import React, { useEffect } from 'react';
import image1 from '@/assets/PlanckSpectrum.svg';
import image2 from '@/assets/EinsteinsModel.svg';

export default function Task3() {




    return (
        <>    

        <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">
            <div className="col-span-2">
                <div className='flex items-center justify-center my-6 '>
                    <div className='text-3xl font-bold'>
                        Planck "Black Body Radiation" Spectrum
                    </div>
                </div>
            </div>
            <div className="col-start-1">
                <p>Plot of Planck 'Black Body Radiation' Spectrum for the temperatures of 4000K, 5000K and 6000K. It shows how the intensity of electromagnetic radiation emmitted by a perfect black body changes across different wavelengths.</p>
                <img src={image1} alt="MATLAB Line Plot" width="800"></img>
            </div>
            <div className="col-start-2 flex flex-col gap-4">
                <p>Plot of Einstein's model of molar heat capacity of solids (gold, copper, titanium, aluminium, iron, silicon and carbon) against temperature, which shows how heat capacity decreases significantly at low temperatures as atomic vibrations are quantised.</p>
                <img src={image2} alt="MATLAB Line Plot" width="800"></img>
            </div>
        </div>

        </>
    );



}