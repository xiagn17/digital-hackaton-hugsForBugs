import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';

import styled from 'styled-components';
import TableButton from "./common/TableButton";
import GooseSettingsDialog from "./dialogs/GooseSettingsDialog";
import IED_PARAMETERS from "../const/IED_PARAMETERS";
import { useDialog } from '../hooks/useDialog';

const GooseAbsoluteWindow = styled.div`
position: fixed;
    top: 70px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 170px);
`;

const GooseButton = styled(TableButton)`
padding: 0 15px;
position: absolute;
bottom: 40px;
left: 50%;
transform: translateX(-50%);
:hover{
cursor: pointer;
}
`;

const GooseApply = styled(TableButton)`
padding: 0 15px;
position: absolute;

top: 30px;
right: 110px;

:hover{
cursor: pointer;
}

background: #2A5EA1;
color: #FFFFFF;
`;
const GooseSettings = (props) => {
    const { devices } = props;
    const dialog = useDialog();
    if (devices.length === 0) return null;

    const onGooseApply = () => {
        const devicesSettings = devices
            .filter(d => d.type === 'ied')
            .map(({networkData, gcb, goooseId, macAddress, appId, vlanId, minTime, maxTime, name}) => {
                const l = name.length;
                const first = name.slice(l - 1, l) === '1';
                const second = name.slice(l - 1, l) === '2';

                return {
                    ...networkData,
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

        console.log('isAllAnswersRight', isAllAnswersRight);
    };
    return (
        <GooseAbsoluteWindow>
            <GooseSettingsDialog open={dialog.open} devices={devices} onClose={dialog.onClose} />
            <GooseButton onClick={dialog.onOpen} >Подписки GOOOSE-сообщений</GooseButton>
            <GooseApply onClick={onGooseApply}>Отправить GOOOSE-сообщений</GooseApply>
        </GooseAbsoluteWindow>
    );
};

export default GooseSettings;
