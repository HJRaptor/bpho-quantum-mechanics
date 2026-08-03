import React, { useEffect } from 'react';
import image1 from '@/assets/ElectronRecoilAngle.svg';
import image2 from '@/assets/ElectronRecoilSpeed.svg';
import image3 from '@/assets/FractionalWavelength.svg';

export default function Task9() {

    return (
        <>

        <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-4 mx-4">
            <div className="col-span-2">
                <div className='flex items-center justify-center my-6 '>
                    <div className='text-3xl font-bold'>
                        Compton Scattering
                    </div>
                </div>
            </div>
            <div className="col-start-1">
                <img src={image1} alt="MATLAB Line Plot" width="800"></img>
                <div className="h-6"></div>
                <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
                <div className="h-6"></div>
                <img src={image2} alt="MATLAB Line Plot" width="800"></img>
            </div>
            <div className="col-start-2 flex flex-col gap-4">
                <p>Compton scattering shows that electromagnetic radiation behaves like particles (photons).</p>
                <p>Top left: shows how electron recoil angle varies with photon scattering angle.</p>
                <p>Bottom left: shows how electron recoil speed varies with photon scattering angle.</p>
                <p>Bottom right: shows how fractional wavelength shift varies with photon scattering angle.</p>
                <hr style={{ border: "none", borderTop: "1px solid #ccc" }} />
                <div className="h-6"></div>
                <img src={image3} alt="MATLAB Line Plot" width="800"></img>
            </div>
        </div>

        </>
    );

    
}
