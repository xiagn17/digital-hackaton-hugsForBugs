import IEDDevice from '../entities/device/IEDDevice';
import SwitchDevice from '../entities/device/SwitchDevice';

export const IED = 'ied';
export const SWITCH = 'switch';

export const DEVICE_TYPE_CONSTRUCTORS_MAP = {
    [IED]: IEDDevice,
    [SWITCH]: SwitchDevice,
};
