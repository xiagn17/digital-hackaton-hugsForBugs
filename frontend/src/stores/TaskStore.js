import { makeObservable, observable, computed, action } from "mobx"
import IEDDevice from "../entities/device/IEDDevice";
import SwitchDevice from "../entities/device/SwitchDevice";

const DEVICE_TYPES = {
    'ied': IEDDevice,
    'switch': SwitchDevice,
};

class TaskStore {
    constructor() {
        this._devices = [];
        this._step = 1;
        this._gooseSettings = [];
        this.errors = [];
        
        makeObservable(this, {
            _devices: observable,
            _step: observable,
            _gooseSettings: observable,

            devices: computed,
            step: computed,
            _gooseSettings: computed,

            createDevice: action,
            updateDevice: action,
            deleteDevice: action,

            nextStep: action,
            prevStep: action,
        })
    }

    get devices() {
        return this._devices;
    }

    createDevice(type, model) {
        const length = this._devices.filter((d) => d.type === type).length;
        const name = `${DEVICE_TYPES[type]}-${length + 1}`;
        const newDevice = new DEVICE_TYPES[type](name, model);

        this._devices.push(newDevice);
        return newDevice;
    }

    updateDevice(id, data) {
        const device = this._devices.find((d) => d.id === id);
        device.update(data);

        return device;
    }

    deleteDevice(id) {
        this._devices = this._devices.filter((d) => d.id !== id);
    }

    nextStep() {
        this._step += 1;
    }

    prevStep() {
        this._step -= 1;
    }
}

export default new TaskStore();
