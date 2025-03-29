import React, { useContext, useEffect } from 'react'
import { Store } from '../../App'
import useAreaHook from '../../hooks/sections/useAreaHook'

const ISecComp = () => {
    const {section , setSection} = useContext(Store)

    const {areaCalc , CGCalc} = useAreaHook()

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

    const run_calcs = () => {
        let members = section.members

        members.bottom_flange.xg = members.bottom_flange?.length / 2
        members.bottom_flange.yg = members.bottom_flange?.thickness / 2
        members.web.xg = members.bottom_flange?.length / 2
        members.web.yg = parseFloat(members.bottom_flange?.thickness) + parseFloat(members.web?.length) / 2
        members.top_flange.xg = parseFloat(members.bottom_flange?.length) / 2
        members.top_flange.yg = parseFloat(members.bottom_flange?.thickness) + parseFloat(members.web?.length) + parseFloat(members.top_flange?.thickness) / 2
        
        setSection(prev => ({...prev , members}))
        
        areaCalc()
        CGCalc()
    }

    // initialize members before start
    useEffect(() => {
        setSection({
            members : {
                top_flange : {length : 0 , thickness : 0} , 
                bottom_flange : {length : 0 , thickness : 0} , 
                web : {length : 0 , thickness : 0} , 
            }
        })
    } , [])

    useEffect(() => {
        console.log(section);
    } , [section])

  return (
        <div className='grid grid-cols-2 gap-4'>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">top flange thickness:</label>
                <input onChange={e => assign_member_data('top_flange' , 'thickness' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">top flange length:</label>
                <input onChange={e => assign_member_data('top_flange' , 'length' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">bottom flange thickness:</label>
                <input onChange={e => assign_member_data('bottom_flange' , 'thickness' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">bottom flange length:</label>
                <input onChange={e => assign_member_data('bottom_flange' , 'length' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">web flange thickness:</label>
                <input onChange={e => assign_member_data('web' , 'thickness' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">web flange length:</label>
                <input onChange={e => assign_member_data('web' , 'length' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>

            <button onClick={run_calcs} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">calc</button>
        </div>
  )
}

export default ISecComp