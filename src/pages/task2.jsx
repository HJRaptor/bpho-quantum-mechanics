import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import Navbar from '@/components/navbar';
import { Shapes } from 'lucide-react';


export default function Task2() {

    //brownian motion simulations

    //constants

    const N = 1000
    const T = 100

    const m = 28.96e-3 / 6.022e23
    const M = 10*m

    const r = 0.16
    const R = 10*r

    const a = 7*R

    const C = 1

    const k_B = 1.38e-23

    let v= Math.sqrt(3*k_B*(T+273)/m)
    let V= Math.sqrt(3*k_B*(T+273)/M)

    const Kn = 15

    let tmax = 200

    v = v/1000
    V = V/1000

    let dt = 0.01*Kn*r/v

    let stopstop = 0;

    //ball displacement
    function ball_displacement(x1,y1,x2,y2){
        d = Math.sqrt((x2-x1 )**2  + (y2-y1)**2)




    }


    while (stopstop == 0){

        let X = 0.5*a
        let Y = 0.5*a

        let theta = 2 * pi * Math.random()
        let Vx = V*Math.cos(theta)
        let Vy = V*Math.sin(theta)

        let x = []
        let y = []

        for(let n=0; n<=N; n++){
            d=0
            while(d < (R+r)){
                x[n] = r + Math.random*(a-2*r)
                y[n] = r + Math.random*(a-2*r)

            }


        }

    }



    let layout = {

        autosize: true,
        title: { text: `Brownian Motion Simulation 200 ps` },
        showlegend: true,

        shapes: [{
            
            type: 'rect',
            x0: 0,
            y0: 0,
            x1: 7,
            y1: 7,
            line:{
                color: 'black',
                width: 5

            }
            
            
        }]
    }
    
    let config = {
            responsive: true,
            displayModeBar: false
        }

    useEffect(() => {
        Plotly.newPlot('myplot',[] ,layout, config);
    }, []);    



    return (
        <>
        <div className='w-full max-w-[80vh] aspect-1/1' id="myplot" ></div>
        </>
    );



}