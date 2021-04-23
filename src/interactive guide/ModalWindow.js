import React, {useState, useEffect, useCallback, useLayoutEffect} from "react";
import "../scss/volt/components/ModalWindow.scss"


const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {
}

const wheelOpt = supportsPassive ? {passive: false} : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';


function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}


function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

const changePosition = ({ref, fixed, position}, modalWindow) => {
    let modalStyle;
    switch (position) {
        case "right":
            modalStyle = {
                top: ref.offsetTop + ref.offsetHeight / 2 - modalWindow.offsetHeight / 2,
                left: ref.offsetLeft + ref.offsetWidth
            }
            break;
        case "left":
            modalStyle = {
                top: ref.offsetTop + ref.offsetHeight / 2 - modalWindow.offsetHeight / 2,
                left: ref.offsetLeft - modalWindow.offsetWidth
            }
            break;
        case "top":
            modalStyle = {
                top: ref.offsetTop - modalWindow.offsetHeight,
                left: ref.offsetLeft + ref.offsetWidth / 2 - modalWindow.offsetWidth / 2
            }
            break;
        case "bottom":
            modalStyle = {
                top: ref.offsetTop - ref.offsetHeight,
                left: ref.offsetLeft + ref.offsetWidth / 2 - modalWindow.offsetWidth / 2
            }
            break;
        default:
            modalStyle = {
                top: ref.offsetTop + ref.offsetHeight / 2 - modalWindow.offsetHeight / 2,
                left: ref.offsetLeft + ref.offsetWidth
            }
            break;
    }
    modalStyle.position = fixed ? "fixed" : "absolute";
    return modalStyle;
}

const changeHighlightedItemStyle = ({ref, fixed}) => ({
    position: fixed ? "fixed" : "absolute",
    top: ref.offsetTop,
    left: ref.offsetLeft,
    height: ref.offsetHeight,
    width: ref.offsetWidth,
    borderRadius: window.getComputedStyle(ref, null).borderRadius
})

const changePositionByOffset = (guide, modalWindow) => {

    const {ref, position} = guide;
    const {height, width} = modalWindow;
    const screenWidth = window.innerWidth;

    if ((position === "right" && ref.offsetLeft + ref.offsetWidth + width > screenWidth) ||
        (position === "left" && ref.offsetLeft - width < 0)) {
        if (ref.offsetTop - height < 0) {
            return changePosition({...guide, position: "bottom"}, modalWindow)
        } else {
            return changePosition({...guide, position: "top"}, modalWindow)
        }
    } else {
        return changePosition(guide, modalWindow)
    }
}


export const ModalWindow = ({guide, nextGuide, previousGuide, guidesLength, currentId, finishGuide, skipGuides}) => {

    const [modalWindow, setModalWindow] = useState({offsetWidth: 0, offsetHeight: 0});
    const [modalStyle, setModalStyle] = useState();
    const [highlightedItemStyle, setHighlightedItemStyle] = useState(changeHighlightedItemStyle(guide));

    const measuredRef = useCallback(ref => {
        if (ref !== null) {
            setModalWindow(ref)
        }
    }, [])

    useLayoutEffect(() => {
        function resize() {
            setModalStyle(changePositionByOffset(guide, modalWindow, setModalStyle));
            setHighlightedItemStyle(changeHighlightedItemStyle(guide));

        }

        window.addEventListener('resize', resize);
        disableScroll();

        return () => {
            window.removeEventListener('resize', resize);
            enableScroll();
        }
    })
    useEffect(() => {
        setModalStyle(changePositionByOffset(guide, modalWindow));
        setHighlightedItemStyle(changeHighlightedItemStyle(guide));
    }, [guide, modalWindow])
    useEffect(() => {
        if (modalWindow.offsetWidth) modalWindow.scrollIntoView({block: "center"});
    }, [modalStyle, modalWindow])


    return (
        <>
            <>
                <div className="highlighted-item" style={highlightedItemStyle}> </div>
                <div className="dark-screen"> </div>
                <button onClick={skipGuides} className="btn btn-danger skip-button">I'm already know everything (Skip
                    tutorial)
                </button>
                <div className="modal-window" style={modalStyle} ref={measuredRef}>
                    <div>
                        {guide.message}
                    </div>
                    <div className="btn-group">
                        <button onClick={previousGuide} className="btn btn-outline-primary"
                                disabled={currentId === 0}>Previous
                        </button>
                        {guidesLength - 1 !== currentId ?
                            <button className="btn btn-outline-primary" onClick={nextGuide}>Next</button> :
                            <button className="btn btn-outline-danger" onClick={finishGuide}>End</button>
                        }
                    </div>
                </div>
            </>
        </>
    )
}