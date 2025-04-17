import React from 'react'

const useSubAnalysisEqu = () => {

    // maximum moment calculations
    const handleMaxMinCalcs = (row , element , station , type , max = true , label) => {
        let max_moment_station = element[type][station]

        // station existed before 
        if(max_moment_station){
            if(max && (max_moment_station[label] < row[label])){
                element[type][station] = row
            }
            if(!max && (max_moment_station[label] > row[label])){
                element[type][station] = row
            }
        }else { // station not existed before
            element[type][station] = row
        }

        return element
    }

    return {handleMaxMinCalcs}
}

export default useSubAnalysisEqu