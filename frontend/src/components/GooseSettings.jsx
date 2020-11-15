import React, {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';

import styled from 'styled-components';
import TableButton from "./common/TableButton";
import GooseSettingsDialog from "./dialogs/GooseSettingsDialog";
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


    return (
        <GooseAbsoluteWindow>
            <GooseSettingsDialog open={dialog.open} devices={devices} onClose={dialog.onClose} />
            <GooseButton onClick={dialog.onOpen} >Подписки GOOOSE-сообщений</GooseButton>
            <GooseApply>Отправить GOOOSE-сообщений</GooseApply>
        </GooseAbsoluteWindow>
    );
};

export default GooseSettings;
