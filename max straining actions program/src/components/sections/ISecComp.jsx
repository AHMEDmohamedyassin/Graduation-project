import React, { useContext, useEffect } from 'react'
import { Store } from '../../App'
import useAreaHook from '../../hooks/sections/useAreaHook'
import ISecHook from '../../hooks/sections/ISecHook'

const ISecComp = () => {
    const {section , setSection} = useContext(Store)
    const {assign_member_data , run_calcs} = ISecHook()

    useEffect(() => {
        console.log(section);
    } , [section])

  return (
        <div className='grid grid-cols-2 gap-4 items-end'>

            {/* yield stress */}
            <div class=" w-full col-span-2">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">fy (t/cm2):</label>
                <input value={section?.fy_unfactored ?? 0} onChange={e => setSection(prev => ({...prev , fy_unfactored : e.target.value , fy : e.target.value * 0.58 }))} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>

            {/* A1 factor */}
            <div class=" w-full">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">A1 factor:</label>
                <input value={section?.A1 ?? 1} onChange={e => setSection(prev => ({...prev , A1 : e.target.value }))} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>

            {/* chooose element type  */}
            <div class="w-full">
              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">element type</label>
              <select onChange={e => setSection(prev => ({...prev , type : e.target.value}))} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={'beam'} selected>beam</option>
                <option value={'column'}>column</option>
              </select>
            </div>

            {/* unsupported length */}
            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">unsupported length (in plane):</label>
                <input value={section?.Lx?? 0} onChange={e => setSection(prev => ({...prev , Lx : e.target.value}))} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">unsupported length (out of plane):</label>
                <input value={section?.Ly ?? 0} onChange={e => setSection(prev => ({...prev , Ly : e.target.value}))} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>

            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">top flange thickness:</label>
                <input value={section?.members?.top_flange?.Ly ?? 0} onChange={e => assign_member_data('top_flange' , 'Ly' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">top flange length:</label>
                <input value={section?.members?.top_flange?.Lx ?? 0} onChange={e => assign_member_data('top_flange' , 'Lx' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">bottom flange thickness:</label>
                <input value={section?.members?.bottom_flange?.Ly ?? 0} onChange={e => assign_member_data('bottom_flange' , 'Ly' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">bottom flange length:</label>
                <input value={section?.members?.bottom_flange?.Lx ?? 0} onChange={e => assign_member_data('bottom_flange' , 'Lx' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">web  thickness:</label>
                <input value={section?.members?.web?.Lx ?? 0} onChange={e => assign_member_data('web' , 'Lx' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">web  length:</label>
                <input value={section?.members?.web?.Ly ?? 0} onChange={e => assign_member_data('web' , 'Ly' , e.target.value)} type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>

            <button onClick={run_calcs} type="button" class="h-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">calc</button>
        </div>
  )
}

export default ISecComp