import React, {useCallback, useEffect, useState} from "react";
import {ModalWindow} from "./ModalWindow";
import {InteractiveGuideContext} from "./InteractiveGuideContext";

const finishedTag = new Set();

export const InteractiveGuideWrapper = ({children}) => {

    const [guides, setGuides] = useState([]);

    const [currentId, setCurrentId] = useState(0);

    const [skipped, setSkipped] = useState(false);

    const setInteractiveGuide = useCallback((ref, {
        id,
        message,
        fixed = false,
        position = "right",
        tag
    }) => {
        if (ref !== null) {
            const newItem = {ref, message, fixed, position, tag};
            setGuides(prevState => {
                return [...prevState.slice(0, id), newItem, ...prevState.slice(id + 1)].filter(item => !finishedTag.has(item.tag))
            })
        }
    }, [setGuides])

    const nextGuide = useCallback(() => {
        setCurrentId(prevId => prevId + 1);
    }, [setCurrentId])

    const previousGuide = useCallback(() => {
        setCurrentId(prevId => prevId - 1);
    }, [setCurrentId])

    const finishGuide = useCallback(() => {
        setGuides(prevGuides => {
            for (let item of prevGuides) {
                finishedTag.add(item.tag);
            }
            return [];
        });
    }, [setGuides])

    const skipGuides = useCallback(() => {
        setSkipped(true);
    }, [setSkipped])

    useEffect(() => {
        setCurrentId(0);
    }, [guides])

    return (
        <InteractiveGuideContext.Provider value={setInteractiveGuide}>
            {children}
            {(guides[currentId] && !skipped) &&
            <ModalWindow guide={guides[currentId]} nextGuide={nextGuide} previousGuide={previousGuide}
                         guidesLength={guides.length} currentId={currentId}
                         finishGuide={finishGuide} skipGuides={skipGuides}/>}
        </InteractiveGuideContext.Provider>
    )
}