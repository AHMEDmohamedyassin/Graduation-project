import React from 'react'
import SectionPropComp from './SectionPropComp'
import ISecComp from './ISecComp'
import SubMembersDataComp from './SubMembersDataComp'

const SectionComp = () => {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 items-start gap-10'>
        <img src='/ibeam.png'/>
        <ISecComp/>
        <div className='lg:col-span-2'>
          <SectionPropComp/>
        </div>
        <div className='lg:col-span-4'>
          <SubMembersDataComp/>
        </div>
    </div>
  )
}

export default SectionComp