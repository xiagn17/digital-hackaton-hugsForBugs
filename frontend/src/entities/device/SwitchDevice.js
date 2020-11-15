import AbstractDevice from './AbstractDevice';
import Ciso7000 from '../../components/Ciso7000';
import { INITIAL } from '../../const/PORT_STATUS';

export const SWITCH = 'switch';

class SwitchDevice extends AbstractDevice {
    constructor(name, model) {
        super(name, model, SWITCH);
        this.networkSettings = {};
        this.ports = Array(8)
            .fill(null)
            .map((_, i) => ({ id: `${this.id}-${i}`, status: INITIAL }));
    }

    getNetworkSettings() {
        return this.networkSettings;
    }

    updateNetworkSettings(settings) {
        this.networkSettings = settings;
    }
}

export default SwitchDevice;

const SWITCHER_1_LABEL = 'Cisco SFS 7000 Series InfiniBand';

export const MODELS = [
    {
        label: SWITCHER_1_LABEL,
        img:
            'https://www.karma-group.ru/upload/iblock/1a1/Cisco_SFS_7000.13dfc73b8ccc8b6256542370f679467f1.webp',
        details: `CISCO SFS 7000P - это коммутатор, поддерживают двухскоростные интерфейсы InfiniBand 4X с удвоенной скоростью обмена данными (DDR) и обычной скоростью обмена данными (SDR), пропускная способность каждого порта которых составляет 20 Гбит/с и 10 Гбит/с соответственно. Низкое время задержки и высокая пропускная способность серверных коммутаторов Cisco SFS 7000D InfiniBand способствует созданию нового класса распределенных приложений и систем, обеспечивающих большую гибкость и ведущих к конкурентоспособным преимуществам.`,
        component: Ciso7000,
        type: SWITCH,
    },
];
