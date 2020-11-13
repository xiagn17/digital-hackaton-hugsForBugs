import AbstractDevice from "./AbstractDevice";

const TYPE = 'ied';

const IMAGES = {
    '150': 'https://www.mtrele.ru/images/site/catalog/bmrz-150-lico.jpg',
};

class IEDDevice extends AbstractDevice {
    constructor(name, model) {
        super(name, TYPE);
        this.model = model;
        this.img = IMAGES[model];
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
