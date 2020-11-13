const data = [
    {
        questions: 'Как расшифровывается аббревиатура IED?',
        answers: [
            {
                text: 'Информационно электронное реле',
                isRight: false,
            },
            {
                text: 'Интеллектуальное устройство учета',
                isRight: false,
            },
            {
                text: 'Интеллектуальное электронное устройство',
                isRight: true,
            },
            {
                text: 'Международный энергетический департамент',
                isRight: false,
            },
        ],
    },
    {
        questions: 'Какие сетевые настройки IED влияют на передачу GOOSE-сообщений?',
        answers: [
            {
                text: 'MAC-адрес и IP-адрес',
                isRight: false,
            },
            {
                text: 'IP-адрес и VLAN',
                isRight: false,
            },
            {
                text: 'MAC-адрес и APPID',
                isRight: false,
            },
            {
                text: 'Все вместе',
                isRight: true,
            },
        ],
    },
    {
        questions: 'К какому механизму передачи данных относятся GOOSE-сообщения?',
        answers: [
            {
                text: 'Клиент-сервер',
                isRight: false,
            },
            {
                text: 'Master-slave',
                isRight: false,
            },
            {
                text: 'Издатель-подписчик',
                isRight: true,
            },
            {
                text: 'Точка-точка',
                isRight: false,
            },
        ],
    },
    {
        questions: 'Какие первоначальные четыре октета MAC-адреса зарезервировано за ТК57 МЭК?',
        answers: [
            {
                text: '01:0D:BB:01',
                isRight: false,
            },
            {
                text: '00:0С:ВB:01',
                isRight: false,
            },
            {
                text: '01:0С:CD:04',
                isRight: false,
            },
            {
                text: '01:0C:CD:01',
                isRight: true,
            },
        ],
    },
    {
        questions: 'В каком диапазоне можно задавать VLAN для устройств, обменивающихся GOOSE сообщении?',
        answers: [
            {
                text: '0-9999',
                isRight: false,
            },
            {
                text: '0-4095',
                isRight: true,
            },
            {
                text: '0-1000',
                isRight: false,
            },
            {
                text: '0-512',
                isRight: false,
            },
        ],
    },
    {
        questions: 'В какой главе серии стандартов МЭК 61850 описывается механизм передачи GOOSE сообщений?',
        answers: [
            {
                text: 'МЭК 61850-6',
                isRight: false,
            },
            {
                text: 'МЭК 61850-7-4',
                isRight: false,
            },
            {
                text: 'МЭК 61850-8-1',
                isRight: true,
            },
            {
                text: 'МЭК 61850-9-2',
                isRight: false,
            },
        ],
    },
    {
        questions: 'Можно ли задавать одинаковые MAC-адреса разным IED?',
        answers: [
            {
                text: 'Да',
                isRight: false,
            },
            {
                text: 'Нет',
                isRight: true,
            },
        ],
    },
    {
        questions: 'Как расшифровывается аббревиатура GOOSE?',
        answers: [
            {
                text: 'Общее объектно-ориентированное событие на подстанции',
                isRight: true,
            },
            {
                text: 'Быстрое сообщение релейной защиты',
                isRight: false,
            },
            {
                text: 'Никак не расшифровывается, это название птицы',
                isRight: false,
            },
            {
                text: 'Сообщение для передачи объема данных в энергетике',
                isRight: false,
            },
        ],
    },
    {
        questions: 'К какому методу передачи трафика относится GOOSE-сообщения?',
        answers: [
            {
                text: 'Unicast',
                isRight: false,
            },
            {
                text: 'Broadcast',
                isRight: false,
            },
            {
                text: 'Multicast',
                isRight: true,
            },
        ],
    },
    {
        questions: 'По какому интерфейсу передаются GOOSE – сообщения?',
        answers: [
            {
                text: 'RS-485',
                isRight: false,
            },
            {
                text: 'RS-422',
                isRight: false,
            },
            {
                text: 'Ethernet',
                isRight: true,
            },
            {
                text: 'RS-232',
                isRight: false,
            },
        ],
    },
    {
        questions: 'Какое минимальное время между дублирующими GOOSE-сообщениями типа 1А может быть установлено согласно «Корпоративному профилю МЭК 61850»?',
        answers: [
            {
                text: '4мс',
                isRight: true,
            },
            {
                text: '10мс',
                isRight: false,
            },
            {
                text: '1мс',
                isRight: false,
            },
            {
                text: '1 мкс',
                isRight: false,
            },
        ],
    },
    {
        questions: 'На каком уровне модели OSI передаются GOOSE – сообщения?',
        answers: [
            {
                text: 'Канальный',
                isRight: true,
            },
            {
                text: 'Транспортный',
                isRight: false,
            },
            {
                text: 'Прикладной',
                isRight: false,
            },
            {
                text: 'Сетевой',
                isRight: false,
            },
        ],
    },
    {
        questions: 'Как обозначается устройство на цифровой подстанции передающее/принимающее информации и имеющее хотя бы один процессор?',
        answers: [
            {
                text: 'IED',
                isRight: true,
            },
            {
                text: 'LED',
                isRight: false,
            },
            {
                text: 'VMA',
                isRight: false,
            },
            {
                text: 'STP',
                isRight: false,
            },
        ],
    },
    {
        questions: 'На каком уровне передается информация посредством GOOSE – сообщений?',
        answers: [
            {
                text: 'Кольцевой',
                isRight: false,
            },
            {
                text: 'Горизонтальный',
                isRight: true,
            },
            {
                text: 'Вертикальный',
                isRight: false,
            },
            {
                text: 'Сквозной',
                isRight: false,
            },
        ],
    },
    {
        questions: 'По какому механизму передачи данных работают GOOSE-сообщения?',
        answers: [
            {
                text: 'TPAA',
                isRight: false,
            },
            {
                text: 'MCAA',
                isRight: true,
            },
            {
                text: 'P2P',
                isRight: false,
            },
            {
                text: 'По всем перечисленным',
                isRight: false,
            },
        ],
    },
];

export default data;
