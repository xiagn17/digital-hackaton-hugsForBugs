import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Device from './Device';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
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
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const [connectionRerenderTrigger, triggerConnectionRerender] = useState(
        null,
    );

    const onDrag = (e, position) => {
        // triggerConnectionRerender(position);
    };

    return (
        <Container
        >
            {devices.map(
                (device, i) =>
                    device?.model?.component && (
                        <Device key={device.id} device={device} onDrag={onDrag} deviceIndex={i + 1} />
                    ),
            )}
            <GooseSettings devices={devices}/>
        </Container>
    );
}

TaskPlayground.propTypes = {
    devices: PropTypes.arrayOf(PropTypes.object),
};

TaskPlayground.defaultProps = {
    devices: [],
};
