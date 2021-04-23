import {InteractiveGuideContext} from "./InteractiveGuideContext"
import {useContext} from "react";
export const useInteractiveGuide = () =>{
    const interactiveGuideContext = useContext(InteractiveGuideContext);

    if(!interactiveGuideContext) {
        throw new Error('useInteractiveGuide require InteractiveGuideWrapper');
    }
    return interactiveGuideContext;
}