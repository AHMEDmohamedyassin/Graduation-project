import React from 'react'
import * as XLSX from "xlsx";
import useStateHook from './useStateHook';

const useHandleFileUpload = ({setData , loading , setLoading}) => {

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      
      setLoading(true) 

      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
  
        const sheetName = workbook.SheetNames[0]; // Get the first sheet name
        const sheet = workbook.Sheets[sheetName];
  
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert sheet to JSON
        
        
        setData(jsonData);
        setLoading(false)
      };
      
      reader.readAsBinaryString(file);
    }
  }

  return {handleFileUpload}
};

export default useHandleFileUpload

