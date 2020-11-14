import React, { useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Device from './Device';
import Xarrow from 'react-xarrows';
import { IED } from '../entities/device/IEDDevice';

import GooseSettings from "./GooseSettings";

import styled from 'styled-components';

const boxStyle = {
    width: 100,
    border: 'grey solid 2px',
    borderRadius: '10px',
    padding: '5px',
};
const Container = styled.div`
padding: 10px;
left: 320px;
width: calc(100% - 320px);
height: calc(100% - 70px);
position: absolute;
& > div:not(:last-child) {
position: relative;
z-index: 100;
}
`;

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
        <Container
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
            <GooseSettings devices={devices}/>
        </div>
    );
}

TaskPlayground.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object),
};

TaskPlayground.defaultProps = {
    devices: [],
};
