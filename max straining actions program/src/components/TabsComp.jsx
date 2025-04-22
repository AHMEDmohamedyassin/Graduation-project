import React, { useContext, useEffect } from 'react'
import { Store } from '../App'

const TabsComp = () => {
    const {data , setResult  , result , labels } = useContext(Store)

    // select member 
    const handleSelect = (e) =>{
        if(result.members_critical_loading && result.members_critical_loading[e]){
            setResult(prev => ({...prev , selected_member : result.members_critical_loading[e] , selected_label : e }))
            console.log(result.members_critical_loading[e])
        }
    }
    
  return (
    <>

        {
            result.members_critical_loading ? (
                <ul className="my-10 flex overflow-auto text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {
                        Object.keys(result.members_critical_loading).map((e , index) => (
                            <li onClick={() => handleSelect(e)} key={index} className="me-2">
                                <button className={`inline-block px-4 py-1 text-white ${result.selected_label == e ? "bg-blue-300" : "bg-blue-600"} rounded-lg active`} aria-current="page">{e} </button>
                            </li>
                        ))
                    }
                </ul>
            ) : null
        }

    </>
  )
}

export default TabsComp