import React, { useContext } from 'react'
import { Store } from '../App'

const TableComp = () => {
    const {data , setResult  , result , labels } = useContext(Store)

  return (
    <div>



        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-20">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            straining action type
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
                            <>
                            <div className='w-full text-center font-bold text-2xl my-2 border-y-2 '>{e}</div>
                            {
                                // loop through stations inside straining action
                                result.selected_member && Object.keys(result.selected_member[e])?.map((station , key) => (
                                    <>
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {e}
                                            </th>
                                            {
                                                // loop through table columns names
                                                Object.values(labels)?.map((label , index) => (
                                                    <td key={index} title={label.title} className="px-6 py-4 w-max">
                                                        {result.selected_member[e][station][label.index]}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    </>
                                ))
                            }
                            </>
                        ))
                    }
                </tbody>
            </table>
        </div>




    </div>
  )
}

export default TableComp