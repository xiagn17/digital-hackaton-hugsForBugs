import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';

const boxStyle = {
    width: 100,
    height: 100,
    // border: 'grey solid 2px',
    // borderRadius: '10px',
    // padding: '5px',
};

const Device = ({ onDrag, device }) => {
    return (
        <Draggable
            onDrag={onDrag}
            bounds="parent"
            defaultPosition={{ x: 400, y: 200 }}
        >
            <div style={boxStyle} className="box" id={device.id}>
                <device.model.component device={device} />
            </div>
        </Draggable>
    );
};

Device.propTypes = {
    device: PropTypes.object.isRequired,
    onDrag: PropTypes.func.isRequired,
};

export default Device;
