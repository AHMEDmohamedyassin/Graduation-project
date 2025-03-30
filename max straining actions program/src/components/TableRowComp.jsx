import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../App'
import ISecHook from '../hooks/sections/ISecHook'

const TableRowComp = ({e}) => {
    const {result , labels , setSection} = useContext(Store)
    const {stresses_calc , shear_stress_calc} = ISecHook()

  return (
    <>
    <div className='w-full text-center font-bold text-2xl my-2 border-y-2 '>{e}</div>
    {
        // loop through stations inside straining action
        result.selected_member && Object.keys(result.selected_member[e])?.map((station , key) => (
                <tr key={key} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {e}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {parseFloat(stresses_calc(station , e)).toFixed(3)}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {parseFloat(shear_stress_calc(station , e)).toFixed(3)}
                    </th>
                    {
                        // loop through table columns names
                        Object.values(labels)?.map((label , index) => (
                            <td key={index} title={label.title} className="px-6 py-4 w-max">
                                {
                                    Number.isFinite(parseFloat(result.selected_member[e][station][label.index])) ? 
                                        parseFloat(result.selected_member[e][station][label.index]).toFixed(3)
                                    : result.selected_member[e][station][label.index]
                                }
                            </td>
                        ))
                    }
                </tr>
        ))
    }
    </>
  )
}

export default TableRowComp