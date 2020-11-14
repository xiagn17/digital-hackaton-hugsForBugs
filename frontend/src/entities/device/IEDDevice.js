import AbstractDevice from './AbstractDevice';
import Rza220 from '../../components/Rza220';

export const IED = 'ied';

class IEDDevice extends AbstractDevice {
    constructor(name, model) {
        super(name, model, IED);
        this.gcb = '';
        this.gooseId = '';
        this.macAddress = '';
        this.appId = '';
        this.vlanId = '';
        this.minTime = null;
        this.maxTime = null;
        this.ports = [1, 2, 3];
        this.subscriptions = [];

        this.subscribeTo = this.subscribeTo.bind(this);
        this.unsubscribeFrom = this.unsubscribeFrom.bind(this);
    }

    subscribeTo(deviceId, port) {
        this.subscriptions.push({
            id: deviceId,
            port,
        });
    }

    unsubscribeFrom(deviceId, port) {
        this.subscriptions = this.subscriptions.filter((s) => (
            s.id !== deviceId && s.port !== port
        ));
    }
}

export default IEDDevice;

const BEP_1_LABEL = 'БЭМП РУ-ОЛ.5.220П.R';
const BEP_2_LABEL = 'БМРЗ–101–2–Д–КЛ–01';
const BEP_3_LABEL = 'БМРЗ-103-2-Д-СВ-01';
const BEP_4_LABEL = 'БМРЗ-103-2-Д-ВВ-01';

export const MODELS = [
    {
        label: BEP_1_LABEL,
        img: 'https://www.mtrele.ru/images/site/catalog/bmrz-150-lico.jpg',
        details: `Микропроцессорный блок серии БЭМП РУ-ОЛ  (с микропроцессорной и микроэлектронной элементной базой) предназначен для релейной защиты  и автоматики, управления и сигнализации понижающих трансформаторов и прочих электроустановок, воздушных и кабельных линий электропередачи напряжением 6 - 35 кВ.

        Основные функции БЭМП РУ-ОЛ:
        — релейная защита;
        — противоаварийная автоматика;
        — управление выключателем, контроль положения  и исправности цепей управления выключателя;
        — контроль и сигнализация;
        — измерение электрических параметров сети.`,
        component: Rza220,
        type: IED,
    },
    {
        label: BEP_2_LABEL,
        img:
            'https://etm-volga.ru/upload/iblock/a26/a26007285960f823a5c320ab68165f5c.jpg',
        details: 'some details',
        type: IED,
    },
    {
        label: BEP_3_LABEL,
        img: 'https://www.mtrele.ru/images/site/catalog/bmrz-150-lico.jpg',
        details: 'some details 2',
        type: IED,
    },
    {
        label: BEP_4_LABEL,
        img:
            'https://etm-volga.ru/upload/iblock/a26/a26007285960f823a5c320ab68165f5c.jpg',
        details: 'some details 3',
        type: IED,
    },
];
