// styling
import './_CrudBox.css'
// inline assets
import { hover, rightBorder, hoverPg, hoverBrd } from './_inline'
// react deps
import React, { useState, useEffect, useRef, useReducer } from 'react'
// compos
import BoardInput from './BoardInput.js'
// reducer
import { HOVERACTION, useHoverStyle, initialHover } from './_useHoverStyle'
// HOVERACTION api: 
// OVER_CONT: 'over_cont',
// OVER_PAGE: 'over_page',
// OVER_BOARD: 'over_board',

// OUT_CONT: 'out_cont',
// OUT_PAGE: 'out_page',
// OUT_BOARD: 'out_board'

function CrudBox({ 
    deactivate, 
    lockRemount, 
    collapse, 
    handleCollapse, 
    isAddingReducerAPI 
}) {
    // api destructure
    const { dispatchIsAdding, IS_ADDING_ACTION } = isAddingReducerAPI
    // mount state handling
    const [lock, setLock] = useState(false)

    const crudBoxRef = useRef()
    useEffect(() => { crudBoxRef.current.focus() }, [])

    const handleComponentBlur = () => { 
        if (!lock) { 
            deactivate()
            lockRemount(true)
            setTimeout(() => lockRemount(false), .0001)
        }
    }

    const lockRelock = () => {
        setLock(true)
        setTimeout(() => {
            setLock(false)
        }, .0001)
    }

    // hover state handling
    const [hoverStyle, hoverDispatch] = useReducer(useHoverStyle, initialHover)

    const handleHoverEvent = (actionType) => { hoverDispatch({ type: actionType }) }

    const handleRenderPgInput = () => {
        // expand parent PageCard
        if (collapse) {
            handleCollapse()
        }
        // render PageInput
        dispatchIsAdding({ type: IS_ADDING_ACTION.ADDING_PG })
        deactivate()
    }

    const handleRenderBrdInput = () => {
        // expand parent PageCard
        if (collapse) {
            handleCollapse()
        }
        // render PageInput
        dispatchIsAdding({ type: IS_ADDING_ACTION.ADDING_BRD })
        deactivate()
    }

return (
<>

<div className='crudBox_cont' style={hoverStyle.cont} tabIndex='0' ref={crudBoxRef}
onMouseDown={(ev) => ev.preventDefault()}
onClick={lockRelock}
onBlur={handleComponentBlur}

onMouseOver={(ev) => {
    ev.stopPropagation()
    handleHoverEvent(HOVERACTION.OVER_CONT)
}}
onMouseOut={(ev) => {
    ev.stopPropagation()
    handleHoverEvent(HOVERACTION.OUT_CONT)
}}
>

    <div className='input_option' style={{...rightBorder, ...hoverStyle.page}}
    // hover listeners
    onMouseOver={(ev) => { handleHoverEvent(HOVERACTION.OVER_PAGE) }}
    onMouseOut={(ev) => { handleHoverEvent(HOVERACTION.OUT_PAGE) }}
    // switch ui to adding pg input
    onClick={() => { handleRenderPgInput() }}>
    <h4 className='inputOption_icon'>Pg</h4>
    </div>
    
    <div className='input_option' style={hoverStyle.board}
    // hover listeners
    onMouseOver={(ev) => { handleHoverEvent(HOVERACTION.OVER_BOARD) }}
    onMouseOut={(ev) => { handleHoverEvent(HOVERACTION.OUT_BOARD) }}
    // switch ui to adding brd input
    onClick={() => { handleRenderBrdInput() }}
    >
    <h4 className='inputOption_icon'>Brd</h4>
    </div>

</div>

</>
)
}

export default CrudBox
