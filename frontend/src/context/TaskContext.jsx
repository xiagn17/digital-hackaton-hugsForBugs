import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskContext = React.createContext();

const TaskContextProvider = (props) => {
    const { children } = props;

    const [state, setState] = useState({
        devices: [],
        step: 1,
    });

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

            const updatedDevice = {
                ...devicesCopy[deviceToUpdateIndex],
                ...deviceData,
            };
            devicesCopy[deviceToUpdateIndex] = updatedDevice;

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const updateDevicesNetworkSettings = (netWorkSettingsData) => {
        setState((prevState) => {
            const devicesCopy = prevState.devices;

            for (const [deviceId, networkData] of Object.entries(
                netWorkSettingsData,
            )) {
                const deviceToUpdateIndex = devicesCopy.findIndex(
                    ({ id }) => deviceId === id,
                );

                if (deviceToUpdateIndex !== -1) {
                    devicesCopy[deviceToUpdateIndex] = {
                        ...devicesCopy[deviceToUpdateIndex],
                        networkData,
                    };
                }
            }

            return {
                ...prevState,
                devices: devicesCopy,
            };
        });
    };

    const actions = {
        addDevice,
        removeDevice,
        updateDevice,
        updateDevicesNetworkSettings,
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
