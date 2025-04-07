import React from 'react'
import SectionPropComp from './SectionPropComp'
import AngleSecComp from './AngleSecComp'
import ISecComp from './ISecComp'

const SectionComp = () => {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 items-start gap-10'>
        <img src='/ibeam.png'/>
        <ISecComp/>
        <div className='lg:col-span-2'>
          <SectionPropComp/>
        </div>
    </div>
  )
}

export default SectionComp