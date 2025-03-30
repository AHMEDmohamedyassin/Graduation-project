import React, { useContext, useEffect } from 'react'
import { Store } from '../../App'
import useAreaHook from './useAreaHook'

const ISecHook = () => {
    const {section , setSection , result , labels} = useContext(Store)
    const {areaCalc , CGCalc , inertiaCalc} = useAreaHook()

    // handle assign data from inputs
    const assign_member_data = (member , label , value) => {
        setSection(prev => ({
            ...prev , 
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

        let lb_pass_bottom_flange = ((bottom.Lx / 2 ) / top.Ly) < 21 / Math.pow(section.fy , 0.5)
        let lb_pass_top_flange = ((top.Lx / 2 ) / top.Ly) < (21 / Math.pow(section.fy , 0.5))
        let lb_pass_web = (web.Ly / web.Lx) < (64 / Math.pow(section.fy , 0.5))
        let lb_pass_web_col = (web.Ly / web.Lx) < (58 / Math.pow(section.fy , 0.5))

        setSection(prev => ({
            ...prev , 
            safe : (lb_pass_bottom_flange && lb_pass_top_flange && lb_pass_web) ,
            local_buckling : (lb_pass_bottom_flange && lb_pass_top_flange && lb_pass_web) ? "pass" : "not pass" ,
            members : {
                ...prev.members , 
                bottom_flange : {
                    ...bottom , 
                    lb_value : (bottom.Lx / 2 ) / top.Ly , 
                    lb_pass : lb_pass_bottom_flange
                },
                top_flange : {
                    ...top , 
                    lb_value : (top.Lx / 2 ) / top.Ly , 
                    lb_pass : lb_pass_top_flange
                },
                web : {
                    ...web , 
                    lb_value : web.Ly / web.Lx , 
                    lb_pass :  lb_pass_web,
                    lb_pass_col : lb_pass_web_col
                }
            }
        }))
    }

    // lateral torsional buckling for top flange 
    const Top_Flange_ltb_calc = () => {
        let Lx = section.members?.top_flange?.Lx ?? 0
        let Ly = section.members?.top_flange?.Ly ?? 0
        let Lu = section.Ly      // unsupported length out of plane
        let d = section.members?.web?.Ly ?? 0
        let L1 = 20 * Lx / Math.pow(section.fy , 0.5)
        let L2 = d ? 1280 * Lx * Ly / ( d * section.fy) : 0
        
        let Fltb1 = 800 * Lx * Ly / (d * Lu)
        let rt = Math.pow((Math.pow(Lx , 3) * Ly / 12 ) / (Lx * Ly) , 0.5)
        let Fltb21 = (0.64 - (Math.pow(Lu / rt  , 2 ) * section.fy) / 117600 ) * section.fy
        let Fltb22 = 12000 / Math.pow(Lu / rt , 2)
        let Fltb2 = Fltb22
        if(Lu / rt < 188 / Math.pow(1/section.fy , 0.5))
            Fltb2 = Fltb21

        let Fltb = Math.pow( Math.pow(Fltb1 , 2) + Math.pow(Fltb2 , 2) , 0.5)

        let Fball = Math.min(section.fy , Fltb)

        setSection(prev => ({
            ...prev , 
            Fltb_top_flange : Fltb , 
            L1_unsupported_top_flange : L1 , 
            L2_unsupported_top_flange : L2 , 
            Fball_top_flange : Fball
        }))
    }

    // lateral torsional buckling for Lower flange
    const Bottom_Flange_ltb_calc = () => {
        let Lx = section.members?.bottom_flange?.Lx ?? 0
        let Ly = section.members?.bottom_flange?.Ly ?? 0
        let Lu = section.Ly      // unsupported length out of plane
        let d = section.members?.web?.Ly ?? 0
        let L1 = 20 * Lx / Math.pow(section.fy , 0.5)
        let L2 = d ? 1280 * Lx * Ly / ( d * section.fy) : 0
        
        let Fltb1 = 800 * Lx * Ly / (d * Lu)
        let rt = Math.pow((Math.pow(Lx , 3) * Ly / 12 ) / (Lx * Ly) , 0.5)
        let Fltb21 = (0.64 - (Math.pow(Lu / rt  , 2 ) * section.fy) / 117600 ) * section.fy
        let Fltb22 = 12000 / Math.pow(Lu / rt , 2)
        let Fltb2 = Fltb22
        if(Lu / rt < 188 / Math.pow(1/section.fy , 0.5))
            Fltb2 = Fltb21

        let Fltb = Math.pow( Math.pow(Fltb1 , 2) + Math.pow(Fltb2 , 2) , 0.5)

        let Fball = Math.min(section.fy , Fltb)

        setSection(prev => ({
            ...prev , 
            Fltb_bottom_flange : Fltb , 
            L1_unsupported_bottom_flange : L1 , 
            L2_unsupported_bottom_flange : L2 , 
            Fball_bottom_flange : Fball
        }))
    }


    // global buckling calculations
    const globalBuckling_calc = () => {
        let slenderness_x = section.Lx / section.ix
        let slenderness_y = section.Ly / section.iy
        let slenderness = Math.max(slenderness_x , slenderness_y)
        let Fcr = 7500 / Math.pow(slenderness , 2)
        if(slenderness < 100)
            Fcr = section.fy - 0.000065 * Math.pow(slenderness , 2)

        setSection(prev => ({
            ...prev , 
            Fcr , 
            slenderness_x , 
            slenderness_y,
            slenderness,
        }))
    }


    // amplification factor for bending stress 
    const AmplificationFactor_calc = () => {
        setSection(prev => ({
            ...prev , 
            A1 : 1.1
        }))
    }

    // run calculations
    const run_calcs = () => {
        members_location()
        areaCalc()
        CGCalc()
        inertiaCalc()
        local_buckling()
        Top_Flange_ltb_calc()
        Bottom_Flange_ltb_calc()
        globalBuckling_calc()
        AmplificationFactor_calc()
    }

    // check stresses on section in certain case of loading and on certain section
    // const stresses_calc = (station , member) => {
    //     let N = result.selected_member[member][station][labels.P.index]
    //     let M = result.selected_member[member][station][labels.M2.index]
        
    //     let Fca = - N / section.area         // applied compression
    //     let Fbx = M * (section.members.top_flange.Ly / 2 + section.members.top_flange.yg - section.YG) / section.Ix
    //     let combination = Fca / section.Fcr + Fbx * section.A1 / section.Fball  

    //     if(section.type == "beam") {
    //         combination = Fca / section.Fcr + Fbx / section.Fball  
    //     }

    //     return combination;
    // }

    // check stresses for top flange
    const top_flange_stresses_calc = (station , member) => {
        let N = result.selected_member[member][station][labels.P.index]
        let M = result.selected_member[member][station][labels.M2.index]
        
        let Fa = N / section.area         // applied axial stress
        let Fbx = -M * (section.members.top_flange.Ly / 2 + section.members.top_flange.yg - section.YG) / section.Ix  // applied bending stress
        
        let combination = 0
        
        if(section.type == 'beam'){
            combination = (Fa + Fbx) / section.fy
    
            if(combination < 0){
                combination = Math.abs((Fa + Fbx) / section.Fltb_top_flange)
            }

        }else{
            combination = Fa / (Fa < 0 ? section.Fcr : section.fy) + (Fbx * section.A1) / section.Fball_top_flange
        }

        return combination;
    }

    // check stresses for bottom flange
    const bottom_flange_stresses_calc = (station , member) => {
        let N = result.selected_member[member][station][labels.P.index]
        let M = result.selected_member[member][station][labels.M2.index]
        
        let Fa = N / section.area         // applied axial stress
        let Fbx = M * (section.YG - section.members.bottom_flange.yg) / section.Ix  // applied bending stress
        
        let combination = 0
        
        if(section.type == 'beam'){
            combination = (Fa + Fbx) / section.fy
    
            if(combination < 0){
                combination = Math.abs((Fa + Fbx) / section.Fltb_bottom_flange)
            }

        }else{
            combination = Fa / (Fa < 0 ? section.Fcr : section.fy) + (Fbx * section.A1) / section.Fball_bottom_flange
        }

        return combination;
    }

    // shear stress calculation
    const shear_stress_calc = (station , member) => {
        let Q = result.selected_member[member][station][labels.V2.index]
        let web_area = section.members.web.Lx * section.members.web.Ly

        return Math.abs(web_area ? ((Q / web_area ) / ((section.fy * 0.35) / 0.58)) : 0)
    }

    // initialize members before start
    useEffect(() => {
        setSection({
            safe : true ,
            type : "beam" ,  
            Lx : 300 ,
            Ly : 300 ,
            fy : 1.4 ,
            members : {
                top_flange : {Lx : 30 , Ly : 2.25} , 
                bottom_flange : {Lx : 30 , Ly : 2.25} , 
                web : {Ly : 31.5 , Lx : 1.25} , 
            }
        })
    } , [])

    return {assign_member_data , run_calcs , bottom_flange_stresses_calc , top_flange_stresses_calc , shear_stress_calc}
}

export default ISecHook