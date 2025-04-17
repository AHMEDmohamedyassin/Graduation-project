import React from 'react'

const useSubAnalysisEqu = () => {

    // maximum moment calculations
    const handleMaxMinCalcs = (row , element , station , type , max = true , label) => {
        let max_moment_station = element[type][station]    // type = max_moment , min_moment , ....

        let first_val = max_moment_station[label[0]]
        let second_val = label.length > 1 ? max_moment_station[label[1]] : null
        let final_val = first_val  || second_val

        let first_current_val = row[label[0]]
        let second_currnent_val = label.length > 1 ? row[label[1]] : null
        let final_currnet_val = first_current_val || second_currnent_val

        // station existed before 
        if(max_moment_station){
            if(max && (final_val < final_currnet_val )){
                element[type][station] = row
            }
            if(!max && (final_val > final_currnet_val )){
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