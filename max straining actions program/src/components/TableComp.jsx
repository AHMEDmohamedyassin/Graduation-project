import React, { useContext, useEffect } from 'react'
import { Store } from '../App'
import TableRowComp from './TableRowComp'
import ISecHook from '../hooks/sections/ISecHook'

const TableComp = () => {
    const {data , setResult  , result , labels , section , setSection} = useContext(Store)
    const { shear_stress_calc} = ISecHook()

    useEffect(() => {
        let safe = section?.safe ?? true;
        let max_interaction = 0;
        let max_shear = 0;

        result.selected_member && (
            Object.keys(result.selected_member).map((e) => {
                Object.keys(result.selected_member[e])?.map((station , key) => {
                    // let compination = stresses_calc(station , e)
                    let compination = 0
                    let shear_check = shear_stress_calc(station , e)
                    if(compination > 1 || shear_check > 1)
                        safe = false
                    if(compination > max_interaction)
                        max_interaction = compination
                    if(shear_check > max_shear)
                        max_shear = shear_check
                })
                
            })
        )

        setSection(prev => ({...prev , safe , max_interaction , max_shear}))


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
                                    {e}
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