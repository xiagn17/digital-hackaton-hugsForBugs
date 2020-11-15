import { v4 as uuidv4 } from 'uuid';
import { CONNECTED, INITIAL } from '../../const/PORT_STATUS';

class AbstractDevice {
    constructor(name, model, type) {
        this.id = uuidv4();
        this.name = name;
        this.type = type;
        this.model = model;
        this.linkedDevices = [];
        this.ports = [];
        this.linkTo = this.linkTo.bind(this);
        this.update = this.linkTo.bind(this);
        this.subscriptions = [];
    }

    updatePortStatus(portId, status) {
        const portToUpdateIndex = this.ports.findIndex(
            ({ id }) => id === portId,
        );

        if (this.ports[portToUpdateIndex]) {
            this.ports[portToUpdateIndex].status = status;
        }
    }

    subscribeTo(device, remotePortId, localPortId) {
        const portToUpdateIndex = this.ports.findIndex(
            ({ id }) => id === localPortId,
        );

        const portToUpdate = this.ports[portToUpdateIndex];
        if (portToUpdate.status !== CONNECTED) {
            this.ports[portToUpdateIndex].status = CONNECTED;

            this.subscriptions.push({
                id: device.id,
                remotePortId,
                localPortId: portToUpdate.id,
            });
        }
    }

    unsubscribeFrom(deviceId, remotePortId) {
        const subscribtionToDeleteIndex = this.subscriptions.findIndex(
            (s) =>
                s.deviceId === deviceId &&
                (!remotePortId || s.remotePortId === remotePortId),
        );

        const sToDelete = this.subscriptions[subscribtionToDeleteIndex];

        if (sToDelete) {
            this.updatePortStatus(sToDelete.localPortId, INITIAL);
            this.subscriptions.splice(subscribtionToDeleteIndex, 1);
        }
    }

    linkTo(device) {
        this.linkedDevices.push(device);
        device.linkedDevices.push(this);
    }

    unlinkDevice(device) {
        this.linkedDevices = this.linkedDevices.filter(
            (d) => d.id !== device.id,
        );
        device.linkedDevices = device.linkedDevices.filter(
            (d) => d.id !== this.id,
        );
    }

    update(fields) {
        fields.forEach((f) => {
            this[f.name] = f.value;
        });
    }
}

export default AbstractDevice;
