import React, { useState } from 'react'

const useStateHook = () => {
    const [data, setData] = useState([]);
    const [result , setResult] = useState({
      members_critical_loading : {}
    })

    const [labels , setLabels] = useState({
      Frame : {
        title : "Frame" , 
        index : 0
      },
      Station : {
        title : "Station" , 
        index : 1
      },
      OutputCase : {
        title : "OutputCase" , 
        index : 2
      },
      CaseType : {
        title : "CaseType" , 
        index : 3
      },
      StepType : {
        title : "StepType" , 
        index : 4
      },
      P : {
        title : "P" , 
        index : 5
      },
      V2 : {
        title : "V2" , 
        index : 6
      },
      V3 : {
        title : "V3" , 
        index : 7
      },
      M2 : {
        title : "M2" , 
        index : 8
      },
      M3 : {
        title : "M3" , 
        index : 9
      },
      FrameElem : {
        title : "FrameElem" , 
        index : 10
      },
      ElemStation : {
        title :  "ElemStation" , 
        index : 11
      }
    })

    const [section , setSection] = useState()


    return {data , setData , labels , setLabels , result , setResult , section , setSection}
}

export default useStateHook