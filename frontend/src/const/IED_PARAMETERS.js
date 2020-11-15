const IED_PARAMETERS = {
    first: {
        gcb: 'GOOSE1', // Чтобы не с цифры
        goooseId: 'GS1', // любое
        macAddress: '01:0С:СD:01:00:01', // последние 4 цифры динамические только + у устройств должны быть разными
        appId: '8000', // 8000 – BFFF любое
        vlanId: '4095', // от 0 до 4095
        minTime: '4', // number 4мс должно быть
        maxTime: '1000', // nnumber 1000мс должно быть

        // FOR_CONNECTOR
        ipAddress: '10.151.209.1',
        mask: '255.255.255.0'
    },
    second: {
        gcb: 'GOOSE2',
        goooseId: 'GS2',
        macAddress: '01:0С:СD:01:01:FF',
        appId: '8000',
        vlanId: '4095',
        minTime: '4', // number
        maxTime: '1000', // nnumber

        // FOR_CONNECTOR
        ipAddress: '10.151.209.2',
        mask: '255.255.255.0'
    },
};

export default IED_PARAMETERS;
