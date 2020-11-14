import { v4 as uuidv4 } from 'uuid';

class AbstractDevice {
    constructor(name, model, type) {
        this.id = uuidv4();
        this.name = name;
        this.type = type;
        this.model = model;
        this.linkedDevices = [];

        this.linkTo = this.linkTo.bind(this);
        this.update = this.linkTo.bind(this);
    }

    linkTo(device) {
        this.linkedDevices.push(device);

        if (!device.linkedDevices.includes(this.id)) {
            device.linkTo(this);
        }
    }

    update(fields) {
        fields.forEach((f) => {
            this[f.name] = f.value;
        });
    }
}

export default AbstractDevice;
