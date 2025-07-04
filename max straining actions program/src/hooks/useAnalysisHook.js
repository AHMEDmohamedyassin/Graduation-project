import React, { useContext } from 'react'
import useSubAnalysisEqu from './useSubAnalysisEqu'

const useAnalysisHook = ({data , labels , result , setResult , setLoading}) => {
    const {handleMaxMinCalcs} = useSubAnalysisEqu()

    const members_critical_loading = {
        member_name : {
            max_moment : {
                // station : [] 
                // station : [] 
                // station : [] 
            } , 
            min_moment : {
                // station : [] 
            } , 
            max_shear : {
                // station : [] 
            } , 
            min_shear : {
                // station : [] 
            } , 
            max_axial : {
                // station : [] 
            } , 
            min_axial : {
                // station : [] 
            } , 
        }
    }



    /**
     * handle analysis frames
     */
    const handleAnalysisFrames = () => {
        setLoading(true)

        data.map(row => {
            let frame = row[labels.Frame.index]
            if(!parseInt(frame)) return ;

            let station = row[labels.Station.index]
            let axial = row[labels.P.index]
            let shear = row[labels.V2.index] 
            let moment = row[labels.M3.index]

            let element = result.members_critical_loading[frame]
            
            // if element not existed before
            if(!element){
                element = {
                    max_moment : {[station] : row} ,
                    min_moment : {[station] : row} ,
                    max_shear : {[station] : row} ,
                    min_shear : {[station] : row} ,
                    min_axial : {[station] : row} ,
                    max_axial : {[station] : row} ,
                }

                result.members_critical_loading[frame] = element
            }else { // if element is existed before

                // max moment
                element = handleMaxMinCalcs(row , element , station , 'max_moment' , true , [labels.M3.index , labels.M2.index])
                element = handleMaxMinCalcs(row , element , station , 'min_moment' , false , [labels.M3.index , labels.M2.index])
                element = handleMaxMinCalcs(row , element , station , 'max_shear' , true , [labels.V2.index , labels.V3.index])
                element = handleMaxMinCalcs(row , element , station , 'min_shear' , false , [labels.V2.index , labels.V3.index])
                element = handleMaxMinCalcs(row , element , station , 'max_axial' , true , [labels.P.index])
                element = handleMaxMinCalcs(row , element , station , 'min_axial' , false , [labels.P.index])
            }

            // assign data to results object
            setResult(prev => ({...prev , members_critical_loading : {...prev.members_critical_loading ,[frame] : element} }))

        })
        
        setLoading(false)

    }



    /**
     * handle analysis Joints
     */
    const handleAnalysisJoints = () => {
        setLoading(true)

        data.map(row => {
            let joint = row[labels.Station.index]
            if(!parseInt(joint)) return ;

            let station = row[labels.Station.index]
            let axial = row[labels.P.index]
            let shear = row[labels.V2.index]
            let moment = row[labels.M3.index]

            let element = result.members_critical_loading[joint]
            
            // if element not existed before
            if(!element){
                element = {
                    max_moment : {[station] : row} ,
                    min_moment : {[station] : row} ,
                    max_shear : {[station] : row} ,
                    min_shear : {[station] : row} ,
                    min_axial : {[station] : row} ,
                    max_axial : {[station] : row} ,
                }

                result.members_critical_loading[joint] = element
            }else { // if element is existed before

                // max moment
                element = handleMaxMinCalcs(row , element , station , 'max_moment' , true , [labels.M3.index , labels.M2.index])
                element = handleMaxMinCalcs(row , element , station , 'min_moment' , false , [labels.M3.index , labels.M2.index])
                element = handleMaxMinCalcs(row , element , station , 'max_shear' , true , [labels.V2.index , labels.V3.index])
                element = handleMaxMinCalcs(row , element , station , 'min_shear' , false , [labels.V2.index , labels.V3.index])
                element = handleMaxMinCalcs(row , element , station , 'max_axial' , true , [labels.P.index])
                element = handleMaxMinCalcs(row , element , station , 'min_axial' , false , [labels.P.index])
            }

            // assign data to results object
            setResult(prev => ({...prev , members_critical_loading : {...prev.members_critical_loading ,[joint] : element} }))

        })
        
        setLoading(false)

    }

    return {handleAnalysisFrames , handleAnalysisJoints}
}

export default useAnalysisHook