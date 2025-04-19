import React from 'react'

const useSubAnalysisEqu = () => {

    // maximum moment calculations
    const handleMaxMinCalcs = (row , element , station , type , max = true , label) => {
        let max_moment_station = element[type][station]    // type = max_moment , min_moment , ....

        // station existed before 
        if(max_moment_station){
            let final_val = 0
            let final_currnet_val = 0

            // get the maximum absolute value of current row
            let first_val = max_moment_station[label[0]]
            if(label.length > 1){
                final_val = max_moment_station[label[1]]

                if(Math.max(Math.abs(first_val) , Math.abs(final_val)) == Math.abs(first_val))
                    final_val = first_val
            }else
                final_val = first_val
    
            // get the maximum absolute value of existing row
            let first_current_val = row[label[0]]
            if(label.length > 1){
                final_currnet_val = row[label[1]]

                if(Math.max(Math.abs(first_current_val) , Math.abs(final_currnet_val)) == Math.abs(first_current_val))
                    final_currnet_val = first_current_val
            }else
                final_currnet_val = first_current_val


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