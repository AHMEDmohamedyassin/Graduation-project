import React, { useContext } from 'react'
import { Store } from '../../App'

const SectionPropComp = () => {
    const {section} = useContext(Store)

  return (
    <div>


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                            label
                        </th>
                        <th scope="col" class="px-6 py-3">
                            value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(section ?? {})?.filter(e => e != 'members')?.map((e , index) => (
                            <tr key={index} class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    {e}
                                </th>
                                <td class="px-6 py-4">
                                    {section[e]}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default SectionPropComp