import React, { useContext } from 'react'
import {Store} from '../../App.jsx'

const useAreaHook = () => {
    const {section , setSection} = useContext(Store)

    // calculating sections area
    const areaCalc = () => {
        if(!section?.members) return;

        let area = 0;
        Object.values(section.members)?.map(e => {
            area += e.length * e.thickness
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
            let area = member.length * member.thickness
            x_numerator += area * member.xg
            y_numerator += area * member.yg
        })

        setSection(prev => ({...prev , Xg : x_numerator / prev.area , Yg : y_numerator / prev.area}))
    }

    // calculating inertia Ix , Iy
    const inertiaCalc = () => {
        
    }

    return {areaCalc , CGCalc}
}

export default useAreaHook