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

    //Distance between particles
    function ball_displacement(x1,y1,x2,y2){

        const dx = x2-x1
        const dy = y2-y1
        const d = Math.sqrt(dx**2  + dy**2)
        
        //unit direction

        const dhat = [dx /d , dy /d]
        return [dhat,d]





    }

    //collision physics

    function bounce(x1,y1,x2,y2,ux1,uy1,ux2,uy2,C,M1,M2,R1,R2){

        let vx1 = ux1
        let vy1 = uy1
        let vx2 = ux2
        let vy2 = uy2

        const [dhat, d] = ball_displacement(x1, y1, x2, y2)
        
        //checking for overlapping particles
        if (d <= (R1 + R2)) {
            
            const delta = (R1 + R2 - d) / 2;
            x1 -= delta * dhat[0];
            y1 -= delta * dhat[1];
            x2 += delta * dhat[0];
            y2 += delta * dhat[1];

            //relative velocity components
            const rvx = ux2 - ux1;
            const rvy = uy2 - uy1;

            
            const dotProduct = (rvx * dhat[0]) + (rvy * dhat[1]);

            if (dotProduct < 0) {

                //center of mass velocity components
                const V_x = (M1 * ux1 + M2 * ux2) / (M1 + M2);
                const V_y = (M1 * uy1 + M2 * uy2) / (M1 + M2);

                // New velocity calculations
                vx1 = V_x - C * (ux1 - V_x);
                vy1 = V_y - C * (uy1 - V_y);

                vx2 = V_x - C * (ux2 - V_x);
                vy2 = V_y - C * (uy2 - V_y);
            }
        }

        return [vx1, vy1, vx2, vy2, x1, y1, x2, y2]

    }




    while (stopstop == 0){

        let X = 0.5*a
        let Y = 0.5*a

        let theta = 2 * Math.PI * Math.random()
        let Vx = V*Math.cos(theta)
        let Vy = V*Math.sin(theta)

        let x = []
        let y = []

        for(let n=0; n<=N; n++){
            let d=0
            while(d < (R+r)){
                x[n] = r + Math.random*(a-2*r)
                y[n] = r + Math.random*(a-2*r)

                const [_,d] = ball_displacement(x[n],y[n],X,Y )
                

            }


        }



        let vx = []
        let vy = []

        for (let n=1; n<N; n++){

            let theta = 2 * pi * Math.random()
            vx[n] = v* Math.cos(theta)
            vy[n] = v*Math.sin(theta)


        
        }

        theta = []

        for(let i = 0; i<=500; i++){

            theta.push((i/(500-1)) * (2 * Math.random() * Math.PI))

        }

        let xc = R*cos(theta)
        let yc = R*sin(theta)

        // plot graph here




        //trail

        let XX = X
        let YY = Y


        //plot trail here





        let stop = 0
        let t = 0
        let tt = 0


        while(stop ==0){


            // update time
            t = t + dt
            tt = t + dt

            // update positions
            X = X + Vx*dt;
            Y = Y + Vy*dt;

            x = x + vx*dt;
            y = y + vy*dt;

            // update trail

            XX.push(X);
            YY.push(Y);


            for (let n=1; n<N; n++){

                let result = bounce(X, Y, x[n], y[n], Vx, Vy, vx[n], vy[n], C, M, m, R, r);

                Vx = result.Vx
                Vy = result.Vy
                vx[n] = result.vx
                vy[n] = result.vy
                X = result.X
                Y = result.Y
                x[n] = result.x
                y[n] = result.y

            }


            if (tt > Kn*r/v){

                tt = 0
                for (n=1; n<N; n++){

                    theta = 2 * Math.PI * Math.random()
                    vx[n] = v*Math.cos(theta)
                    vy[n] = v*Math.cos(theta)



                }

            

            }

            
            if (t>tmax){
                
                stop = 1
                stopstop = 1


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