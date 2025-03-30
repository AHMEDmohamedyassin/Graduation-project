import React from 'react'
import SectionPropComp from './SectionPropComp'
import AngleSecComp from './AngleSecComp'
import ISecComp from './ISecComp'

const SectionComp = () => {
  return (
    <div className='grid lg:grid-cols-3 grid-cols-2 items-start gap-10'>
        <SectionPropComp/>
        <ISecComp/>
        <img src='/ibeam.png'/>
    </div>
  )
}

export default SectionComp