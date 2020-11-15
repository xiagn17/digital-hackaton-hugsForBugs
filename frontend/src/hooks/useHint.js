import { useState, useEffect, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { IED } from '../entities/device/IEDDevice';
import { SWITCH } from '../entities/device/SwitchDevice';

const HINTS = [
    {
        details:
            'В разделе устройств выберите два блока РЗА, переместив их на доску.',
    },
    {
        details:
            'В разделе устройств выберите промышленный коммутатор и расположите его рядом с блоками РЗА.',
    },
    {
        details: 'Соедините блоки РЗА с коммутатором с помощью кабелей.',
    },
    {
        details:
            'Откройте сетевые настройки и проставьте необходимые параметры.',
    },
    {
        details:
            'Заполните параметры двух блоков РЗА, кликнув на них и выбрав пункт «Настроить».',
    },
    {
        details:
            'Настройте подписки GOOSE-сообщений, нажав на одноименную кнопку.',
    },
];

export const useHint = (task) => {
    const [hint, setHint] = useState(task);
    const {
        state: { devices, areGooseConnectionsValid },
    } = useContext(TaskContext);

    useEffect(() => {
        const rzaExists =
            devices.filter((device) => device?.type === IED).length > 1;

        if (!rzaExists) {
            setHint(HINTS[0]);
            return;
        }

        const switchExists = devices.find((device) => device?.type === SWITCH);

        if (!switchExists) {
            setHint(HINTS[1]);
            return;
        }

        const deviceConnections = devices.find(
            (device) => device.subscriptions.length,
        );

        if (!deviceConnections) {
            setHint(HINTS[2]);
            return;
        }

        const netWorkSettingsNotFilled = devices.find(
            (device) =>
                (!Boolean(device?.mask) || !Boolean(device?.ipAddress)) &&
                device?.type === IED,
        );

        if (netWorkSettingsNotFilled) {
            setHint(HINTS[3]);
            return;
        }

        const rzaFilled = devices.every((device) =>
            Object.values(device).every((field) => Boolean(field)),
        );
        if (rzaFilled) {
            setHint(HINTS[4]);
            return;
        }

        setHint(5);
    }, [devices]);

    return {
        hint,
    };
};
