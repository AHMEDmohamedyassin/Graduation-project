import React from 'react'
import AngleSecComp from './AngleSecComp'
import SectionPropComp from './SectionPropComp'

const SectionComp = () => {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 items-start gap-10'>
        <img src='/ibeam.png'/>
        <div className='lg:col-span-2'>
          <AngleSecComp/>
        </div>
        <div className='lg:col-span-4'>
          <SectionPropComp/>
        </div>
    </div>
  )
}

export default SectionComp