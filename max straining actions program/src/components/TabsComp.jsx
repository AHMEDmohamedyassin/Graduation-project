import React, { useContext, useEffect } from 'react'
import { Store } from '../App'

const TabsComp = () => {
    const {data , setResult  , result , labels } = useContext(Store)

    // select member 
    const handleSelect = (e) =>{
        if(result.members_critical_loading && result.members_critical_loading[e]){
            setResult(prev => ({...prev , selected_member : result.members_critical_loading[e] }))
        }
    }

    useEffect(() => {
        let members = {}

        data.map(e => {
            let member_name = e[labels.Frame?.index]
            if(parseInt(member_name)){
                let member_station = e[labels.Station?.index]
                if(members[member_name])
                    members[member_name] = [...members[member_name] , member_station]
                else members[member_name] = [member_station]
            }
        })

        setResult(prev => ({...prev , members}))
    } , [data])
  return (
    <>

        {
            result.members ? (
                <ul className="my-10 flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {
                        Object.keys(result.members).map((e , index) => (
                            <li onClick={() => handleSelect(e)} key={index} className="me-2">
                                <button className="inline-block px-4 py-1 text-white bg-blue-600 rounded-lg active" aria-current="page">{e} ({result.members[e]?.length})</button>
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