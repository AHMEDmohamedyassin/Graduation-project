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

        // compact
        let lb_compact_pass_bottom_flange = ((bottom.Lx / 2 ) / bottom.Ly) < 15.3 / Math.pow(section.fy_unfactored , 0.5)
        let lb_compact_pass_top_flange = ((top.Lx / 2 ) / top.Ly) < (15.3 / Math.pow(section.fy_unfactored , 0.5))
        let lb_compact_pass_web = (web.Ly / web.Lx) < (127 / Math.pow(section.fy_unfactored , 0.5))
        let lb_compact_pass_web_col = (web.Ly / web.Lx) < (58 / Math.pow(section.fy_unfactored , 0.5))

        // non_compact
        let lb_pass_bottom_flange = ((bottom.Lx / 2 ) / bottom.Ly) < 21 / Math.pow(section.fy_unfactored , 0.5)
        let lb_pass_top_flange = ((top.Lx / 2 ) / top.Ly) < (21 / Math.pow(section.fy_unfactored , 0.5))
        let lb_pass_web = (web.Ly / web.Lx) < (190 / Math.pow(section.fy_unfactored , 0.5))
        let lb_pass_web_col = (web.Ly / web.Lx) < (64 / Math.pow(section.fy_unfactored , 0.5))

        setSection(prev => ({
            ...prev , 
            lb_safe : (lb_pass_bottom_flange && lb_pass_top_flange && (section.type == "beam" ? lb_pass_web : lb_pass_web_col)) ,
            local_buckling : (lb_pass_bottom_flange && lb_pass_top_flange && (section.type == "beam" ? lb_pass_web : lb_pass_web_col) ) ? "pass" : "not pass" ,
            members : {
                ...prev.members , 
                bottom_flange : {
                    ...bottom , 
                    lb_value : (bottom.Lx / 2 ) / bottom.Ly , 
                    lb_pass : lb_pass_bottom_flange , 
                    compactness : lb_compact_pass_bottom_flange && lb_pass_bottom_flange
                },
                top_flange : {
                    ...top , 
                    lb_value : (top.Lx / 2 ) / top.Ly , 
                    lb_pass : lb_pass_top_flange , 
                    compactness : lb_compact_pass_top_flange && lb_pass_top_flange
                },
                web : {
                    ...web , 
                    lb_value : web.Ly / web.Lx , 
                    lb_pass :  section.type == "beam" ? lb_pass_web : lb_pass_web_col,
                    compactness : section.type == "beam" ? (lb_compact_pass_web && lb_pass_web) : (lb_compact_pass_web_col && lb_pass_web_col)
                }
            }
        }))
    }

    // top flange unsupported length calculation
    const Top_flange_unsupported_length = () => {
        let Lx = parseFloat(section.members?.top_flange?.Lx) ?? 0
        let Ly = parseFloat(section.members?.top_flange?.Ly) ?? 0
        let Ly_bottom_flange = parseFloat(section.members?.bottom_flange?.Ly) ?? 0
        let d = parseFloat(section.members?.web?.Ly) + Ly + Ly_bottom_flange ?? 0    // web depth
        let L1 = 20 * Lx / Math.pow(section.fy_unfactored , 0.5)
        let L2 = d ? ((1360 * Lx * Ly) / ( d * section.fy_unfactored)) : 0
                
        setSection(prev => ({
            ...prev , 
            L1_unsupported_top_flange : L1 , 
            L2_unsupported_top_flange : L2 
        }))
    }

    // lateral torsional buckling for top flange 
    const Top_Flange_ltb_calc = () => {
        let Lx = section.members?.top_flange?.Lx ?? 0
        let Ly = section.members?.top_flange?.Ly ?? 0
        let Lu = section.Ly      // unsupported length out of plane
        let d = section.members?.web?.Ly ?? 0
        let fy = section.fy       // factored yield stress

        // check if section is compact to increase yield stress
        if(section.top_compact)
            fy = section.fy_unfactored * 0.64
        
        let Fltb1 = 800 * Lx * Ly / (d * Lu)
        let rt = Math.pow((Math.pow(Lx , 3) * Ly / 12 ) / (Lx * Ly) , 0.5)
        let Fltb21 = (0.64 - (Math.pow(Lu / rt  , 2 ) * fy) / 117600 ) * fy
        let Fltb22 = 12000 / Math.pow(Lu / rt , 2)
        let Fltb2 = Fltb22
        if(Lu / rt < 188 / Math.pow(1/section.fy_unfactored , 0.5))
            Fltb2 = Fltb21

        let Fltb = Math.pow( Math.pow(Fltb1 , 2) + Math.pow(Fltb2 , 2) , 0.5)

        let Fball = Math.min(fy , Fltb)

        setSection(prev => ({
            ...prev , 
            Fltb_top_flange : Fltb , 
            Fball_top_flange : Fball
        }))
    }

    // bottom flange unsupported length calculation 
    const Bottom_flange_unsupported_length = () => {
        let Lx = parseFloat(section.members?.bottom_flange?.Lx) ?? 0
        let Ly = parseFloat(section.members?.bottom_flange?.Ly) ?? 0
        let Ly_top = parseFloat(section.members?.top_flange?.Ly) ?? 0
        let d = parseFloat(section.members?.web?.Ly) + Ly + Ly_top ?? 0
        let L1 = 20 * Lx / Math.pow(section.fy_unfactored , 0.5)
        let L2 = d ? 1360 * Lx * Ly / ( d * section.fy_unfactored) : 0
        
        setSection(prev => ({
            ...prev , 
            L1_unsupported_bottom_flange : L1 , 
            L2_unsupported_bottom_flange : L2 , 
        }))
    } 

    // lateral torsional buckling for Lower flange
    const Bottom_Flange_ltb_calc = () => {
        let Lx = section.members?.bottom_flange?.Lx ?? 0
        let Ly = section.members?.bottom_flange?.Ly ?? 0
        let Lu = section.Ly      // unsupported length out of plane
        let d = section.members?.web?.Ly ?? 0
        let fy = section.fy

        if(section.bottom_compact)
            fy = section.fy_unfactored * 0.64
        
        let Fltb1 = 800 * Lx * Ly / (d * Lu)
        let rt = Math.pow((Math.pow(Lx , 3) * Ly / 12 ) / (Lx * Ly) , 0.5)
        let Fltb21 = (0.64 - (Math.pow(Lu / rt  , 2 ) * fy) / 117600 ) * fy
        let Fltb22 = 12000 / Math.pow(Lu / rt , 2)
        let Fltb2 = Fltb22
        if(Lu / rt < 188 / Math.pow(1/section.fy_unfactored , 0.5))
            Fltb2 = Fltb21

        let Fltb = Math.pow( Math.pow(Fltb1 , 2) + Math.pow(Fltb2 , 2) , 0.5)

        let Fball = Math.min(fy , Fltb)

        setSection(prev => ({
            ...prev , 
            Fltb_bottom_flange : Fltb , 
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

    // check compactness , section type
    const CheckSectionType = () => {
        let bottom_compact = true // compact
        let top_compact = true // compact

        // check compactness on bottom flange
        // check if unsupported Length Ly is less than L1 , L2
        // check if member is passing local buckling
        if(
            section.Ly < section.L1_unsupported_bottom_flange 
            && section.Ly < section.L2_unsupported_bottom_flange
            && section.members.bottom_flange.compactness
            && section.members.top_flange.compactness
            && section.members.web.compactness
        ){
            bottom_compact = true
        }
        else 
            bottom_compact = false


        // check compactness on top flange
        // check if unsupported Length Ly is less than L1 , L2
        // check if member is passing local buckling
        if(
            section.Ly < section.L1_unsupported_top_flange 
            && section.Ly < section.L2_unsupported_top_flange
            && section.members.bottom_flange.compactness
            && section.members.top_flange.compactness
            && section.members.web.compactness
        ){
            top_compact = true
        }
        else 
            top_compact = false

        setSection(prev => ({
            ...prev , 
            top_compact , 
            bottom_compact
        }))
    } 

    // run calculations
    const run_calcs = () => {
        members_location()
        areaCalc()
        CGCalc()
        inertiaCalc()
        local_buckling()
        // unsupported length calculations
        Top_flange_unsupported_length()
        Bottom_flange_unsupported_length()
        // check section type in case of +ve and -ve moments
        CheckSectionType()

        Top_Flange_ltb_calc()
        Bottom_Flange_ltb_calc()
        globalBuckling_calc()


        console.log('calcs');
        
    }

    // check stresses for top flange
    const top_flange_stresses_calc = (station , member) => {
        let N = result.selected_member[member][station][labels.P.index]
        let M = result.selected_member[member][station][labels.M3.index]
        
        let Fa = N / section.area         // applied axial stress
        let Fbx = M * (section.members.top_flange.Ly / 2 + section.members.top_flange.yg - section.YG) / section.Ix  // applied bending stress
        
        // bending yield stress if the top flange is subjected to tension , the top flange tension resistance depends on bottom compactness and unsupported length
        let fy_bending = section.fy
        if(section.bottom_compact)
            fy_bending = section.fy_unfactored * 0.64

        // console.log(Fa , Fbx);
        
        let combination = 0
        
        // if(section.type == 'beam')
        //     // combination = Fa / (Fa < 0 ? section.Fltb_top_flange : section.fy) + Fbx / (Fbx < 0 ? section.Fltb_top_flange : section.fy) 
        //     combination = Fa / (Fa < 0 ? section.Fball_top_flange : section.fy) + Fbx / (Fbx < 0 ? section.Fball_top_flange : section.fy) 
        // else
            combination = Fa / (Fa < 0 ? section.Fcr : section.fy) + (Fbx * (Fbx < 0 ? section.A1 : 1) ) / (Fbx < 0 ? section.Fball_top_flange : fy_bending)
        

        return combination;
    }

    // check stresses for bottom flange
    const bottom_flange_stresses_calc = (station , member) => {
        let N = result.selected_member[member][station][labels.P.index]
        let M = result.selected_member[member][station][labels.M3.index]
        
        let Fa = N / section.area         // applied axial stress
        let Fbx = -M * (section.YG ) / section.Ix  // applied bending stress
        
        // bending yield stress if the bottom flange is subjected to tension , the bottom flange tension resistance depends on top compactness and unsupported length
        let fy_bending = section.fy
        if(section.top_compact)
            fy_bending = section.fy_unfactored * 0.64

        // console.log(Fa , Fbx);

        let combination = 0
        
        // if(section.type == 'beam')
        //     // combination = Fa / (Fa < 0 ? section.Fltb_bottom_flange : section.fy) + Fbx / (Fbx < 0 ? section.Fltb_bottom_flange : section.fy) 
        //     combination = Fa / (Fa < 0 ? section.Fball_bottom_flange : section.fy) + Fbx / (Fbx < 0 ? section.Fltb_bottom_flange : section.fy) 
        // else
            // combination = Fa / (Fa < 0 ? section.Fcr : section.fy) + (Fbx * (Fbx < 0 ? section.A1 : 1) ) / (Fbx < 0 ? section.Fltb_bottom_flange : section.fy)
            combination = Fa / (Fa < 0 ? section.Fcr : section.fy) + (Fbx * (Fbx < 0 ? section.A1 : 1) ) / (Fbx < 0 ? section.Fball_bottom_flange : fy_bending)

        return combination;
    }

    // shear stress calculation
    const shear_stress_calc = (station , member) => {
        let Q = result.selected_member[member][station][labels.V2.index] || result.selected_member[member][station][labels.V3.index]
        let web_area = section.members.web.Lx * section.members.web.Ly

        return Math.abs(web_area ? ((Q / web_area ) / (parseFloat(section.fy_unfactored) * 0.35)) : 0)
    }

    // initialize members before start
    useEffect(() => {
        // setSection({
        //     safe : true ,
        //     type : "beam" ,  
        //     Lx : 220 ,
        //     Ly : 300 ,
        //     fy : 1.4 ,   // factored fy
        //     fy_unfactored : 2.4,
        //     A1 : 1,
        //     members : {
        //         top_flange : {Lx : 30 , Ly : 1.65} , 
        //         bottom_flange : {Lx : 30 , Ly : 1.65} , 
        //         web : {Ly : 29.7 , Lx : 0.95} , 
        //     }
        // })
    } , [])

    return {assign_member_data , run_calcs , bottom_flange_stresses_calc , top_flange_stresses_calc , shear_stress_calc}
}

export default ISecHook