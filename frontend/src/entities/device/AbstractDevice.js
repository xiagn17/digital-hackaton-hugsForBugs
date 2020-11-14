import { v4 as uuidv4 } from "uuid";

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
    device.linkedDevices.push(this);
  }

  unlinkDevice(device) {
    this.linkedDevices = this.linkedDevices.filter((d) => d.id !== device.id);
    device.linkedDevices = device.linkedDevices.filter((d) => d.id !== this.id);
  }

  update(fields) {
    fields.forEach((f) => {
      this[f.name] = f.value;
    });
  }
}

export default AbstractDevice;
