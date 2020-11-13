import AbstractDevice from "./AbstractDevice";

const TYPE = 'switch';

class SwitchDevice extends AbstractDevice {
    constructor(name, model) {
        super(name, model, TYPE);
        this.networkSettings = {};
    }

    getNetworkSettings() {
        return this.networkSettings;
    }

    updateNetworkSettings(settings) {
        this.networkSettings = settings;
    }
}

export default SwitchDevice;
