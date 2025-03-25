import React, { createContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import TabsComp from "./components/TabsComp";
import database from './data.json'
import useHandleFileUpload from './hooks/useHandleFileUpload'
import useStateHook from "./hooks/useStateHook";
import useAnalysisHook from "./hooks/useAnalysisHook";
import TableComp from "./components/TableComp";

export const Store = createContext();

function App() {
  const {data , setData , labels , setLabels , result , setResult} = useStateHook()
  const { handleFileUpload } = useHandleFileUpload(setData);
  const { handleAnalysis } = useAnalysisHook({data , labels , result , setResult})
  

  // initialize data for testing only 
  useEffect(() => {
    setData(database)
  } , [])

  
  return (
    <Store.Provider value={{data , setData , result , setResult , labels , setLabels}}>
      <div className="max-w-screen-xl px-4 mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
        <input onChange={handleFileUpload} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
        
        <button onClick={handleAnalysis} type="button" className="my-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">start analysis</button>
        
        <TabsComp/>

        <TableComp/>

      </div>
    </Store.Provider>
  )
}

export default App
