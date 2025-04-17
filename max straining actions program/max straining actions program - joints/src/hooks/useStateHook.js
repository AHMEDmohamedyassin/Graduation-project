import React, { useState } from 'react'
import FrameAnalysisXMLcolumns from './FrameAnalysisXMLcolumns.json'
import JointAnalysisXMLcolumns from './JointAnalysisXMLcolumns.json'

const useStateHook = () => {
    const [loading , setLoading] = useState(false)
    const [data, setData] = useState([]);
    const [result , setResult] = useState({
      members_critical_loading : {}
    })

    const [labels , setLabels] = useState(JointAnalysisXMLcolumns)

    const [section , setSection] = useState()


    return {data , setData , labels , setLabels , result , setResult , section , setSection , loading , setLoading}
}

export default useStateHook