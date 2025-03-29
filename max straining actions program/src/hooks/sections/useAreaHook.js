import React, { useContext } from 'react'
import {Store} from '../../App.jsx'

const useAreaHook = () => {
    const {section , setSection} = useContext(Store)

    // calculating sections area
    const areaCalc = () => {
        if(!section?.members) return;

        let area = 0;
        Object.values(section.members)?.map(e => {
            area += e.Ly * e.Lx
        })

        setSection(prev => ({
            ...prev , 
            area
        }))
    }


    // calculate c.g
    const CGCalc = () => {
        let x_numerator = 0
        let y_numerator = 0

        Object.values(section.members)?.map((member) => {
            let area = member.Ly * member.Lx
            x_numerator += area * member.xg
            y_numerator += area * member.yg
        })

        setSection(prev => ({...prev , XG : x_numerator / prev.area , YG : y_numerator / prev.area}))
    }

    // calculating inertia Ix , Iy
    const inertiaCalc = () => {
        let x_inertia = 0
        let y_inertia = 0
        let XG = section.XG
        let YG = section.YG
        
        Object.values(section.members)?.map(({Lx , Ly , xg , yg}) => {
            x_inertia += (Math.pow(Ly , 3) * Lx) / 12 + Lx * Ly * Math.pow(YG-yg , 2)
            y_inertia += (Math.pow(Lx , 3) * Ly) / 12 + Lx * Ly * Math.pow(XG-xg , 2)
        })

        setSection(prev => ({
            ...prev , 
            Ix : x_inertia , 
            Iy : y_inertia , 
            ix : Math.pow(x_inertia / prev.area , 0.5),
            iy : Math.pow(y_inertia / prev.area , 0.5)
        }))

    }

    return {areaCalc , CGCalc , inertiaCalc}
}

export default useAreaHook