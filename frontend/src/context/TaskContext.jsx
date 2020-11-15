import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { PENDING, INITIAL } from '../const/PORT_STATUS';

const TaskContext = React.createContext();

const TaskContextProvider = (props) => {
    const { children } = props;

    const [state, setState] = useState({
        devices: [],
        step: 1,
        gooseConnections: {},
        areGooseConnectionsValid: false,
    });

    const { pendingPort, deviceWithPendingPort } = useMemo(() => {
        for (const device of state.devices) {
            const pendingPort = device.ports.find(
                ({ status }) => status === PENDING,
            );

            if (pendingPort) {
                return { pendingPort, deviceWithPendingPort: device };
            }
        }

        return {};
    }, [state.devices]);

    const addDevice = (device) => {
        setState((prevState) => {
            const devicesCopy = [...prevState.devices, device];

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const removeDevice = (deviceId) => {
        setState((prevState) => {
            const devicesCopy = [...prevState.devices];
            const deviceToDeleteIndex = devicesCopy.findIndex(
                (device) => device.id === deviceId,
            );
            devicesCopy.splice(deviceToDeleteIndex, 1);

            devicesCopy.forEach((d) => {
                d.unsubscribeFrom(deviceId);
            });

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const updateDevice = (deviceId, deviceData) => {
        setState((prevState) => {
            const devicesCopy = [...prevState.devices];
            const deviceToUpdateIndex = devicesCopy.findIndex(
                (device) => device.id === deviceId,
            );

            devicesCopy[deviceToUpdateIndex] = Object.assign(
                devicesCopy[deviceToUpdateIndex],
                deviceData,
            );

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const updateDevicesNetworkSettings = (netWorkSettingsData) => {
        setState((prevState) => {
            const devicesCopy = prevState.devices.concat();

            for (const [deviceId, networkData] of Object.entries(
                netWorkSettingsData,
            )) {
                const deviceToUpdateIndex = devicesCopy.findIndex(
                    ({ id }) => deviceId === id,
                );

                if (deviceToUpdateIndex !== -1) {
                    devicesCopy[deviceToUpdateIndex] = Object.assign(
                        devicesCopy[deviceToUpdateIndex],
                        networkData,
                    );
                }
            }

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const connectDevices = (
        deviceAId,
        deviceAPortId,
        deviceBId,
        deviceBPortId,
    ) => {
        setState((prevState) => {
            const devicesCopy = prevState.devices.concat();

            const deviceA = devicesCopy.find(({ id }) => deviceAId === id);
            const deviceB = devicesCopy.find(({ id }) => deviceBId === id);

            if (deviceAId === deviceBId || deviceA.type === deviceB.type) {
                return prevState;
            }

            deviceA.subscribeTo(deviceB, deviceBPortId, deviceAPortId);
            deviceB.subscribeTo(deviceA, deviceAPortId, deviceBPortId);

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const updatePortStatusOfDevice = (
        deviceId,
        devicePortId,
        status = PENDING,
    ) => {
        setState((prevState) => {
            const devicesCopy = prevState.devices.concat();

            const deviceToUpdate = devicesCopy.find(
                ({ id }) => deviceId === id,
            );

            deviceToUpdate.updatePortStatus(devicePortId, status);

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const updateGooseConnections = (connections, areValid) => {
        setState((prevState) => ({
            ...prevState,
            gooseConnections: connections,
            areGooseConnectionsValid: areValid,
        }));
    };

    const resolveConnection = useCallback(
        (deviceId, portId) => {
            if (pendingPort && deviceWithPendingPort) {
                if (deviceWithPendingPort.id === portId) {
                    updatePortStatusOfDevice(deviceId, portId, INITIAL);
                } else if (deviceId === deviceWithPendingPort.id) {
                    updatePortStatusOfDevice(deviceId, pendingPort.id, INITIAL);
                } else {
                    connectDevices(
                        deviceId,
                        portId,
                        deviceWithPendingPort.id,
                        pendingPort.id,
                    );
                }
            } else {
                updatePortStatusOfDevice(deviceId, portId);
            }
        },
        [state.devices],
    );

    const actions = {
        addDevice,
        removeDevice,
        updateDevice,
        updateDevicesNetworkSettings,
        resolveConnection,
        updateGooseConnections,
    };

    return (
        <TaskContext.Provider
            value={{
                state,
                actions,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

TaskContextProvider.propTypes = {
    children: PropTypes.any,
    defaultState: PropTypes.object,
};
TaskContextProvider.defaultProps = {
    children: null,
    defaultState: {},
};

export { TaskContext, TaskContextProvider };
