import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Device from './Device';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';

const boxStyle = {
    width: 100,
    border: 'grey solid 2px',
    borderRadius: '10px',
    padding: '5px',
};

export default function TaskPlayground({ devices }) {
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const [connectionRerenderTrigger, triggerConnectionRerender] = useState(
        null,
    );

    const onDrag = (e, position) => {
        // triggerConnectionRerender(position);
    };

    return (
        <div
            style={{
                padding: 10,
                left: 320,
                width: 'calc(100% - 320px)',
                height: '100%',
                position: 'absolute',
            }}
        >
            {devices.map((device) => (
                <Device device={device} onDrag={onDrag} />
            ))}
        </div>
    );
}

TaskPlayground.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object),
};

TaskPlayground.defaultProps = {
    devices: [],
};
