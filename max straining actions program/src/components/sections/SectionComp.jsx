import React from 'react'
import SectionPropComp from './SectionPropComp'
import AngleSecComp from './AngleSecComp'
import ISecComp from './ISecComp'

const SectionComp = () => {
  return (
    <div className='flex items-start justify-between gap-10'>
        <SectionPropComp/>
        
        <ISecComp/>

    </div>
  )
}

export default SectionComp