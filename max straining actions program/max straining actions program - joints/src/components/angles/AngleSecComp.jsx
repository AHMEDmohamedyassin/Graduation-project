import React, { useContext } from 'react'
import useAreaHook from '../../hooks/sections/useAreaHook'
import { Store } from '../../App'

const AngleSecComp = () => {
    const {section , setSection} = useContext(Store)

    const {areaCalc} = useAreaHook()

  return (
        <div className='flex flex-col gap-4'>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">thickness:</label>
                <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">leg length:</label>
                <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">unsupported Lx:</label>
                <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>
            <div class="max-w-sm mx-auto">
                <label for="number-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">unsupported Ly:</label>
                <input type="number" id="number-input" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" required />
            </div>

            <button onClick={areaCalc} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">calc</button>
        </div>
  )
}

export default AngleSecComp