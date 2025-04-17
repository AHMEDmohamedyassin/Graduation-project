import React, { useContext, useEffect } from 'react'
import { Store } from '../App'
import TableRowComp from './TableRowComp'
import ISecHook from '../hooks/sections/ISecHook'

const TableComp = () => {
    const {data , setResult  , result , labels , section , setSection} = useContext(Store)
    const { shear_stress_calc , top_flange_stresses_calc , bottom_flange_stresses_calc} = ISecHook()

    useEffect(() => {
        let safe = true;
        let max_top_stress = 0;
        let min_top_stress = 0;
        let max_bottom_stress = 0;
        let min_bottom_stress = 0;
        let max_shear = 0;

        result.selected_member && (
            Object.keys(result.selected_member).map((e) => {
                Object.keys(result.selected_member[e])?.map((station , key) => {
                    let top_stress = top_flange_stresses_calc(station , e);
                    let bottom_stress = bottom_flange_stresses_calc(station , e);
                    let shear_check = shear_stress_calc(station , e)

                    // assign max and min stresses for top and bottom flanges
                    if(top_stress < min_top_stress)
                        min_top_stress = top_stress
                    if(top_stress > max_top_stress)
                        max_top_stress = top_stress
                    if(bottom_stress > max_bottom_stress)
                        max_bottom_stress = bottom_stress
                    if(bottom_stress < min_bottom_stress)
                        min_bottom_stress = bottom_stress

                    // assign max shear
                    if(shear_check > max_shear)
                        max_shear = shear_check
                })
                
            })
        )

        if(!section?.lb_safe || Math.max(Math.abs(min_bottom_stress) ,Math.abs(min_top_stress) , max_top_stress , max_bottom_stress) > 1)
            safe = false

        setSection(prev => ({...prev , safe , max_top_stress , min_top_stress , max_bottom_stress , min_bottom_stress , max_shear}))


    } , [result.selected_member])

  return (
    <div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-20">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            straining action type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            top flange interaction
                        </th>
                        <th scope="col" className="px-6 py-3">
                            bottom flange interaction
                        </th>
                        <th scope="col" className="px-6 py-3">
                            shear stress / allowable shear
                        </th>
                        {
                            Object.keys(labels)?.map((e , index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {labels[e].title}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        // loop through straining actions of member
                        Object.keys(result.selected_member ?? {})?.map((e , index) => (
                            <TableRowComp key={index} e={e}/>
                        ))
                    }
                </tbody>
            </table>
        </div>




    </div>
  )
}

export default TableComp