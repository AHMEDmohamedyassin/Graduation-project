import React, { useContext, useEffect } from 'react'
import { Store } from '../../App'
import useAreaHook from './useAreaHook'

const ISecHook = () => {
    const {section , setSection} = useContext(Store)
    const {areaCalc , CGCalc , inertiaCalc} = useAreaHook()

    // handle assign data from inputs
    const assign_member_data = (member , label , value) => {
        setSection(prev => ({
            ...prev , 
            fy : 1.4 ,
            members : {
                ...(prev?.members ?? {}) , 
                [member] : {
                    ...((prev?.members ?? {})[member] ?? {}) , 
                    [label] : value
                }
            }
        }))
    }

    // getting members location x , y coordinates
    const members_location = () => {
        let members = section.members

        members.bottom_flange.xg = members.bottom_flange?.Lx / 2
        members.bottom_flange.yg = members.bottom_flange?.Ly / 2
        members.web.xg = members.bottom_flange?.Lx / 2
        members.web.yg = parseFloat(members.bottom_flange?.Ly) + parseFloat(members.web?.Ly) / 2
        members.top_flange.xg = parseFloat(members.bottom_flange?.Lx) / 2
        members.top_flange.yg = parseFloat(members.bottom_flange?.Ly) + parseFloat(members.web?.Ly) + parseFloat(members.top_flange?.Ly) / 2
        
        setSection(prev => ({...prev , members}))
    }

    // local buckling 
    const local_buckling = () => {
        let bottom = section.members.bottom_flange
        let top = section.members.top_flange
        let web = section.members.web
        setSection(prev => ({
            ...prev , 
            members : {
                ...prev.members , 
                bottom_flange : {
                    ...bottom , 
                    lb_value : (bottom.Lx / 2 ) / top.Ly , 
                    lb_pass : ((bottom.Lx / 2 ) / top.Ly) < 21 / Math.pow(section.fy , 0.5)
                },
                top_flange : {
                    ...top , 
                    lb_value : (top.Lx / 2 ) / top.Ly , 
                    lb_pass : ((top.Lx / 2 ) / top.Ly) < (21 / Math.pow(section.fy , 0.5))
                },
                web : {
                    ...web , 
                    lb_value : web.Ly / web.Lx , 
                    lb_pass : (web.Ly / web.Lx) < (64 / Math.pow(section.fy , 0.5)) ,
                    lb_pass_col : (web.Ly / web.Lx) < (58 / Math.pow(section.fy , 0.5))
                }
            }
        }))
    }

    // run calculations
    const run_calcs = () => {
        members_location()
        areaCalc()
        CGCalc()
        inertiaCalc()
        local_buckling()
    }

    // initialize members before start
    useEffect(() => {
        setSection({
            members : {
                top_flange : {Lx : 0 , Ly : 0} , 
                bottom_flange : {Lx : 0 , Ly : 0} , 
                web : {Ly : 0 , Lx : 0} , 
            }
        })
    } , [])

    return {assign_member_data , run_calcs}
}

export default ISecHook