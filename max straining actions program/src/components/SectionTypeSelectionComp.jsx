import React, { useContext } from 'react'
import { Store } from '../App'

const SectionTypeSelectionComp = () => {
    const {setSectionType , sectionType} = useContext(Store)

  return (
        <div>
          <select defaultValue={sectionType} onChange={e => setSectionType(e.target.value)} className='w-64 border-gray-500 border-2 rounded shadow m-4'>
            <option value={'isection'}>i section</option>
            <option value={'angle'}>angles</option>
          </select>
        </div>
  )
}

export default SectionTypeSelectionComp