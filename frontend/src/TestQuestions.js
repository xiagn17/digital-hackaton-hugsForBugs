const data = [
    {
        id: 1,
        question: 'Как расшифровывается аббревиатура IED?',
        answers: [
            {
                text: 'Информационно электронное реле',
                isRight: false,
                number: 1
            },
            {
                text: 'Интеллектуальное устройство учета',
                isRight: false,
                number: 2
            },
            {
                text: 'Интеллектуальное электронное устройство',
                isRight: true,
                number: 3
            },
            {
                text: 'Международный энергетический департамент',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 2,
        question: 'Какие сетевые настройки IED влияют на передачу GOOSE-сообщений?',
        answers: [
            {
                text: 'MAC-адрес и IP-адрес',
                isRight: false,
                number: 1
            },
            {
                text: 'IP-адрес и VLAN',
                isRight: false,
                number: 2
            },
            {
                text: 'MAC-адрес и APPID',
                isRight: false,
                number: 3
            },
            {
                text: 'Все вместе',
                isRight: true,
                number: 4
            },
        ],
    },
    {
        id: 3,
        question: 'К какому механизму передачи данных относятся GOOSE-сообщения?',
        answers: [
            {
                text: 'Клиент-сервер',
                isRight: false,
                number: 1
            },
            {
                text: 'Master-slave',
                isRight: false,
                number: 2
            },
            {
                text: 'Издатель-подписчик',
                isRight: true,
                number: 3
            },
            {
                text: 'Точка-точка',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 4,
        question: 'Какие первоначальные четыре октета MAC-адреса зарезервировано за ТК57 МЭК?',
        answers: [
            {
                text: '01:0D:BB:01',
                isRight: false,
                number: 1
            },
            {
                text: '00:0С:ВB:01',
                isRight: false,
                number: 2
            },
            {
                text: '01:0С:CD:04',
                isRight: false,
                number: 3
            },
            {
                text: '01:0C:CD:01',
                isRight: true,
                number: 4
            },
        ],
    },
    {
        id: 5,
        question: 'В каком диапазоне можно задавать VLAN для устройств, обменивающихся GOOSE сообщении?',
        answers: [
            {
                text: '0-9999',
                isRight: false,
                number: 1
            },
            {
                text: '0-4095',
                isRight: true,
                number: 2
            },
            {
                text: '0-1000',
                isRight: false,
                number: 3
            },
            {
                text: '0-512',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 6,
        question: 'В какой главе серии стандартов МЭК 61850 описывается механизм передачи GOOSE сообщений?',
        answers: [
            {
                text: 'МЭК 61850-6',
                isRight: false,
                number: 1
            },
            {
                text: 'МЭК 61850-7-4',
                isRight: false,
                number: 2
            },
            {
                text: 'МЭК 61850-8-1',
                isRight: true,
                number: 3
            },
            {
                text: 'МЭК 61850-9-2',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 7,
        question: 'Можно ли задавать одинаковые MAC-адреса разным IED?',
        answers: [
            {
                text: 'Да',
                isRight: false,
                number: 1
            },
            {
                text: 'Нет',
                isRight: true,
                number: 2
            },
        ],
    },
    {
        id: 8,
        question: 'Как расшифровывается аббревиатура GOOSE?',
        answers: [
            {
                text: 'Общее объектно-ориентированное событие на подстанции',
                isRight: true,
                number: 1
            },
            {
                text: 'Быстрое сообщение релейной защиты',
                isRight: false,
                number: 2
            },
            {
                text: 'Никак не расшифровывается, это название птицы',
                isRight: false,
                number: 3
            },
            {
                text: 'Сообщение для передачи объема данных в энергетике',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 9,
        question: 'К какому методу передачи трафика относится GOOSE-сообщения?',
        answers: [
            {
                text: 'Unicast',
                isRight: false,
                number: 1
            },
            {
                text: 'Broadcast',
                isRight: false,
                number: 2
            },
            {
                text: 'Multicast',
                isRight: true,
                number: 3
            },
        ],
    },
    {
        id: 10,
        question: 'По какому интерфейсу передаются GOOSE – сообщения?',
        answers: [
            {
                text: 'RS-485',
                isRight: false,
                number: 1
            },
            {
                text: 'RS-422',
                isRight: false,
                number: 2
            },
            {
                text: 'Ethernet',
                isRight: true,
                number: 3
            },
            {
                text: 'RS-232',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 11,
        question: 'Какое минимальное время между дублирующими GOOSE-сообщениями типа 1А может быть установлено согласно «Корпоративному профилю МЭК 61850»?',
        answers: [
            {
                text: '4мс',
                isRight: true,
                number: 1
            },
            {
                text: '10мс',
                isRight: false,
                number: 2
            },
            {
                text: '1мс',
                isRight: false,
                number: 3
            },
            {
                text: '1 мкс',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 12,
        question: 'На каком уровне модели OSI передаются GOOSE – сообщения?',
        answers: [
            {
                text: 'Канальный',
                isRight: true,
                number: 1
            },
            {
                text: 'Транспортный',
                isRight: false,
                number: 2
            },
            {
                text: 'Прикладной',
                isRight: false,
                number: 3
            },
            {
                text: 'Сетевой',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 13,
        question: 'Как обозначается устройство на цифровой подстанции передающее/принимающее информации и имеющее хотя бы один процессор?',
        answers: [
            {
                text: 'IED',
                isRight: true,
                number: 1
            },
            {
                text: 'LED',
                isRight: false,
                number: 2
            },
            {
                text: 'VMA',
                isRight: false,
                number: 3
            },
            {
                text: 'STP',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 14,
        question: 'На каком уровне передается информация посредством GOOSE – сообщений?',
        answers: [
            {
                text: 'Кольцевой',
                isRight: false,
                number: 1
            },
            {
                text: 'Горизонтальный',
                isRight: true,
                number: 2
            },
            {
                text: 'Вертикальный',
                isRight: false,
                number: 3
            },
            {
                text: 'Сквозной',
                isRight: false,
                number: 4
            },
        ],
    },
    {
        id: 15,
        question: 'По какому механизму передачи данных работают GOOSE-сообщения?',
        answers: [
            {
                text: 'TPAA',
                isRight: false,
                number: 1
            },
            {
                text: 'MCAA',
                isRight: true,
                number: 2
            },
            {
                text: 'P2P',
                isRight: false,
                number: 3
            },
            {
                text: 'По всем перечисленным',
                isRight: false,
                number: 4
            },
        ],
    },
];

export default data;
