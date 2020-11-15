import React, {useState} from 'react';

import styled from 'styled-components';
import TableButton from './common/TableButton';
import GooseSettingsDialog from './dialogs/GooseSettingsDialog';
import IED_PARAMETERS from '../const/IED_PARAMETERS';
import { useDialog } from '../hooks/useDialog';
import TaskResultDialog from "./dialogs/TaskResultDialog";

const GooseButton = styled(TableButton)`
    padding: 0 15px;
    position: fixed;
    bottom: 124px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    :hover {
        cursor: pointer;
    }
`;

const GooseApply = styled(TableButton)`
    padding: 0 15px;
    position: absolute;

    top: 30px;
    right: 110px;

    :hover {
        cursor: pointer;
    }

    background: #2a5ea1;
    color: #ffffff;
`;
const GooseSettings = (props) => {
    const { devices } = props;
    const dialog = useDialog();
    const dialog1 = useDialog();
    const [result, setResult] = useState('success');
    if (devices.length === 0) return null;


    const onGooseApply = () => {
        const devicesSettings = devices
            .filter(d => d.type === 'ied')
            .map(({networkData, ipAddress: ipAddressA, mask: maskA, gcb, goooseId, macAddress, appId, vlanId, minTime, maxTime, name}) => {
                const l = name.length;
                const first = name.slice(l - 1, l) === '1';
                const second = name.slice(l - 1, l) === '2';
                const ipAddress = networkData?.ipAddress || ipAddressA || undefined;
                const mask = networkData?.mask || maskA || undefined;
                return {
                    ipAddress,
                    mask,
                    gcb,
                    goooseId,
                    macAddress,
                    appId,
                    vlanId,
                    minTime,
                    maxTime,
                    type: first ? 'first' : (second ? 'second' : ''),
                };
            }).filter(d => d.type !== '');
        if (devicesSettings.length !== 2) {
            console.log('nedostatochno')
            return; // ошибкаа Недостаточно данных о двух коммутаторах
        }
        const isAllAnswersRight = devicesSettings.reduce((acc, settings) => {
            const rightAnswers = IED_PARAMETERS[settings.type];
            const isAllRight = Object.keys(rightAnswers)
                .map(key => {
                    return rightAnswers[key] === settings[key];
                })
                .filter((cur) => !cur).length === 0;
            return acc && isAllRight;
        }, true);

        const result = isAllAnswersRight ? 'success' : 'failure';
        console.log('isAllAnswersRight', isAllAnswersRight, devicesSettings);
        setResult(result);
        dialog1.onOpen();
    };

    return (
        <>
            <GooseSettingsDialog
                open={dialog.open}
                devices={devices}
                onClose={dialog.onClose}
            />
            <TaskResultDialog result={result} open={dialog1.open} onClose={dialog1.onClose}/>
            <GooseButton onClick={dialog.onOpen}>
                Подписки GOOOSE-сообщений
            </GooseButton>
            <GooseApply onClick={onGooseApply}>
                Отправить GOOOSE-сообщений
            </GooseApply>
        </>
    );
};

export default GooseSettings;
