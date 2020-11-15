import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Device from './Device';
import Xarrow from 'react-xarrows';
import { IED } from '../entities/device/IEDDevice';

import GooseSettings from './GooseSettings';

import styled from 'styled-components';
import { SWITCH } from '../const/deviceTypes';

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

    const switchConnections = useMemo(
        () =>
            devices
                .filter(({ type }) => type === SWITCH)
                .reduce(
                    (accum, elem) =>
                        elem.subscriptions?.length
                            ? accum.concat(elem.subscriptions)
                            : accum,
                    [],
                ),
        [devices],
    );

    const ieds = useMemo(() => devices.filter((d) => d.type === IED), [
        devices,
        connections,
    ]);

    useEffect(() => {
        if (connections.length >= 2) {
            connections.forEach((conn) => {
                const device = ieds.find(
                    (d) => conn.localPortId.slice(0, -2) === d.id,
                );

                ieds.filter(
                    (d) => d.id !== conn.localPortId.slice(0, -2),
                ).forEach((d) => {
                    if (!device.linkedDevices.find((ld) => ld.id === d.id)) {
                        device.linkTo(d);
                    }
                });
            });
        }
    }, [connections.length, ieds]);

    return (
        <Container>
            {devices.map(
                (device, i) =>
                    device?.model?.component && (
                        <Device
                            setCoordinates={setCoordinates}
                            key={device.id}
                            device={device}
                            deviceIndex={ieds.indexOf(device) + 1}
                        />
                    ),
            )}
            {connections.map((c, k) => {
                return (
                    <Xarrow
                        key={`${coordinates}-${k}-${devices.length}`}
                        start={c.localPortId}
                        end={c.remotePortId}
                    />
                );
            })}
            {switchConnections.length >= 2 && <GooseSettings devices={ieds} />}
        </Container>
    );
}

TaskPlayground.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object),
};

TaskPlayground.defaultProps = {
    devices: [],
};
