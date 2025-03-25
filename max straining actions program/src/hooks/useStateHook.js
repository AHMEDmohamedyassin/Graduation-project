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
      StepType : {
        title : "StepType" , 
        index : 3
      },
      P : {
        title : "P" , 
        index : 4
      },
      V2 : {
        title : "V2" , 
        index : 5
      },
      M3 : {
        title : "M3" , 
        index : 6
      },
      FrameElem : {
        title : "FrameElem" , 
        index : 7
      },
      ElemStation : {
        title :  "ElemStation" , 
        index : 8
      }
    })


    return {data , setData , labels , setLabels , result , setResult}
}

export default useStateHook