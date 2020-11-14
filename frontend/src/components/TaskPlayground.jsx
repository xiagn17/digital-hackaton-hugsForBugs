import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';

const boxStyle = {
    border: 'grey solid 2px',
    borderRadius: '10px',
    padding: '5px',
};

export default function TaskPlayground() {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const [smth, setSmth] = useState(1);

    const onControlledDrag = (e, position) => {
        const { x, y } = position;
        setSmth(x || y);
    };

    return (
        <div>
            <Draggable onDrag={onControlledDrag}>
                <div className="box" ref={box1Ref} style={boxStyle}>
                    I can be dragged anywhere
                </div>
            </Draggable>
            <Draggable onDrag={onControlledDrag}>
                <div className="box" ref={box2Ref} style={boxStyle}>
                    I can be dragged anywhere
                </div>
            </Draggable>
            <Xarrow start={box1Ref} end={box2Ref} key={smth} />
        </div>
    );
}
