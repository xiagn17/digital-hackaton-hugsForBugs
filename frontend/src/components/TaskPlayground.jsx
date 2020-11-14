import React, { useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Device from './Device';
import Xarrow from 'react-xarrows';
import { IED } from '../entities/device/IEDDevice';

export default function TaskPlayground({ devices }) {
    const [coordinates, setCoordinates] = useState({});
    const connections = useMemo(
        () =>
            devices
                .filter(({ type }) => type === IED)
                .reduce(
                    (accum, elem) =>
                        elem.subscriptions?.length
                            ? accum.concat(elem.subscriptions)
                            : accum,
                    [],
                ),
        [devices],
    );

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
            {devices.map(
                (device, i) =>
                    device?.model?.component && (
                        <Device
                            setCoordinates={setCoordinates}
                            key={device.id}
                            device={device}
                            deviceIndex={i + 1}
                        />
                    ),
            )}
            {connections.map((c) => {
                return (
                    <Xarrow
                        key={coordinates}
                        start={c.localPortId}
                        end={c.remotePortId}
                    />
                );
            })}
        </div>
    );
}

TaskPlayground.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object),
};

TaskPlayground.defaultProps = {
    devices: [],
};
