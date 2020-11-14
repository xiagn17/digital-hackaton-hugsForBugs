import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { debounce } from 'lodash';

const boxStyle = {
    width: 100,
    height: 100,
};

const Device = ({ setCoordinates, device }) => {
    const onDrag = debounce((e, coordinates) => {
        if (device.subscriptions.length) {
            setCoordinates(coordinates);
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
