import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { debounce } from 'lodash';

const boxStyle = {
    width: 100,
    height: 100,
};

const Device = ({ setCoordinates, device, deviceIndex }) => {
    const onDrag = debounce((e, coordinates) => {
        if (device.subscriptions.length) {
            setCoordinates((prevState) => {
                const coordinatesCopy = { ...prevState };
                const updatedCoordinates = device.subscriptions.reduce(
                    (accum, s) => {
                        accum[s.localPortId] = coordinates;
                        accum[s.removePortId] = coordinates;

                        return accum;
                    },
                    coordinatesCopy,
                );

                return updatedCoordinates;
            });
        }
    }, 0);

    const deviceName = deviceIndex > 0 && device.type === 'ied' ? device.type.toUpperCase() + deviceIndex : null;
    return (
        <Draggable
            onDrag={onDrag}
            bounds="parent"
            defaultPosition={{ x: 400, y: 200 }}
        >
            <div style={boxStyle} className="box" id={device.id}>
                <device.model.component device={device} deviceName={deviceName} />
            </div>
        </Draggable>
    );
};

Device.propTypes = {
    device: PropTypes.object.isRequired,
    onDrag: PropTypes.func.isRequired,
};

export default Device;
