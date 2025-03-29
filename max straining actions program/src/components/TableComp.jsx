import React, { useContext } from 'react'
import { Store } from '../App'
import TableRowComp from './TableRowComp'

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
                        <th scope="col" className="px-6 py-3">
                            interaction equation result
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