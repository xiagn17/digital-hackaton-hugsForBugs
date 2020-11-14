import AbstractDevice from "./AbstractDevice";

const TYPE = 'ied';

class IEDDevice extends AbstractDevice {
    constructor(name, model) {
        super(name, TYPE);
        this.model = model;
        this.gcb = '';
        this.gooseId = '';
        this.macAddress = '';
        this.appId = '';
        this.vlanId = '';
        this.minTime = null;
        this.maxTime = null;
    }
}

export default IEDDevice;

export const MODELS = [
    {
        label: 'БЭМП РУ-ОЛ.5.220П.R',
        img: 'https://www.mtrele.ru/images/site/catalog/bmrz-150-lico.jpg',
        details: `Микропроцессорный блок серии БЭМП РУ-ОЛ  (с микропроцессорной и микроэлектронной элементной базой) предназначен для релейной защиты  и автоматики, управления и сигнализации понижающих трансформаторов и прочих электроустановок, воздушных и кабельных линий электропередачи напряжением 6 - 35 кВ.

        Основные функции БЭМП РУ-ОЛ:
        — релейная защита;
        — противоаварийная автоматика;
        — управление выключателем, контроль положения  и исправности цепей управления выключателя;
        — контроль и сигнализация;
        — измерение электрических параметров сети.`,
    },
    {
        label: 'БМРЗ–101–2–Д–КЛ–01',
        img: 'https://etm-volga.ru/upload/iblock/a26/a26007285960f823a5c320ab68165f5c.jpg',
        details: 'some details',
    },
    {
        label: 'БМРЗ-103-2-Д-СВ-01',
        img: 'https://www.mtrele.ru/images/site/catalog/bmrz-150-lico.jpg',
        details: 'some details 2',
    },
    {
        label: 'БМРЗ-103-2-Д-ВВ-01',
        img: 'https://etm-volga.ru/upload/iblock/a26/a26007285960f823a5c320ab68165f5c.jpg',
        details: 'some details 3',
    },
]
