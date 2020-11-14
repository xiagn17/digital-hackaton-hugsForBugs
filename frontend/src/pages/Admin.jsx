import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {sendHttpRequest} from "../utils/sendHttpRequest";
import {API_TEST_GETALL, API_ALL} from "../const/API_URL";
import Page from "../components/Page";
import Table from "../components/common/Table";
import TableButton from "../components/common/TableButton";


import StatsAdmin1 from '../assets/imgs/admin_stats.png';
import StatsAdmin2 from '../assets/imgs/admin_round.png';
import TestQuestions from "../TestQuestions";
import { TaskInfo } from "./Home";

const tasksToAdd = [
    'Настройка IED на прием-передачу GOOSE-сообщений',
    'Соединение присоединений Bay',
    'Атрибут данных DataAtribute',
    'Протокол МЭК 61850-8-1 GOOSE',
    'Протокол передачи данных Sampled Values',
    'Режим работы (Mod) и поведение (Beh) функций',
    'Сценарии использования режимов испытаний для SV-потоков'
];

const profileIcon = <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6C16 9.31371 13.7614 12 11 12C8.23858 12 6 9.31371 6 6C6 2.68629 8.23858 0 11 0C13.7614 0 16 2.68629 16 6Z" fill="white"/>
    <path d="M16 12.9C18.2 13.8 19.9 15.3 20.8 17.1C21.5 18.5 20.4 20 18.9 20H3.09997C1.59997 20 0.499973 18.5 1.19997 17.2C2.09997 15.4 3.79997 13.9 5.99997 13C6.59997 12.7 7.29997 12.8 7.79997 13C8.79997 13.6 9.79997 13.9 11 13.9C12.2 13.9 13.2 13.6 14.2 13C14.7 12.7 15.4 12.7 16 12.9Z" fill="white"/>
</svg>;
const statIcon = <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9091 0H9.09091C8.09091 0 7.27273 0.818182 7.27273 1.81818V16.3636C7.27273 17.3636 8.09091 18.1818 9.09091 18.1818H10.9091C11.9091 18.1818 12.7273 17.3636 12.7273 16.3636V1.81818C12.7273 0.818182 11.9091 0 10.9091 0Z" fill="white"/>
    <path d="M3.63636 9.09091H1.81818C0.818182 9.09091 0 9.90909 0 10.9091V16.3636C0 17.3636 0.818182 18.1818 1.81818 18.1818H3.63636C4.63636 18.1818 5.45455 17.3636 5.45455 16.3636V10.9091C5.45455 9.90909 4.63636 9.09091 3.63636 9.09091Z" fill="white"/>
    <path d="M16.3636 5.45455H18.1818C19.1818 5.45455 20 6.27273 20 7.27273V16.3636C20 17.3636 19.1818 18.1818 18.1818 18.1818H16.3636C15.3636 18.1818 14.5455 17.3636 14.5455 16.3636V7.27273C14.5455 6.27273 15.3636 5.45455 16.3636 5.45455Z" fill="white"/>
</svg>;
const userIcon = () => <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9091 0H9.09091C8.09091 0 7.27273 0.818182 7.27273 1.81818V16.3636C7.27273 17.3636 8.09091 18.1818 9.09091 18.1818H10.9091C11.9091 18.1818 12.7273 17.3636 12.7273 16.3636V1.81818C12.7273 0.818182 11.9091 0 10.9091 0Z" fill="#2A5EA1"/>
    <path d="M3.63636 9.09091H1.81818C0.818182 9.09091 0 9.90909 0 10.9091V16.3636C0 17.3636 0.818182 18.1818 1.81818 18.1818H3.63636C4.63636 18.1818 5.45455 17.3636 5.45455 16.3636V10.9091C5.45455 9.90909 4.63636 9.09091 3.63636 9.09091Z" fill="#2A5EA1"/>
    <path d="M16.3636 5.45455H18.1818C19.1818 5.45455 20 6.27273 20 7.27273V16.3636C20 17.3636 19.1818 18.1818 18.1818 18.1818H16.3636C15.3636 18.1818 14.5455 17.3636 14.5455 16.3636V7.27273C14.5455 6.27273 15.3636 5.45455 16.3636 5.45455Z" fill="#2A5EA1"/>
</svg>;


const Container = styled.div`
display: flex;
flex-direction: column;
padding-left: 122px;
padding-top: 40px;
padding-right: 113px;
padding-bottom: 20px;
`;

const FlexContainerRow = styled.div`
display: flex;
flex-direction: row;
width: 100%;
`;
const FirstContainer = styled(FlexContainerRow)`
justify-content: space-between;
margin-bottom: 47px;
`;

const MiddleTable = styled(Table)`
width: calc(50% - 12px);
`;
const BigTable = styled(Table)`
width: 100%;
`;

const Stats = styled.div`
display: flex;
flex-direction: column;
align-items: center;
& > img {
width: 160px;
height: 160px;
margin-bottom: 24px;
}
& > button {
margin-top: 24px;
}
:first-child {
margin-right: 70px;
}
`;

const List = styled.div`

`;
const Line = styled.div`
:not(:first-child){
margin-top: 24px;
}
display: flex;
flex-direction: row;
justify-content: space-between;

:hover {
cursor: pointer;
background: #fafafa;
}
`;

const ImgButton = styled(userIcon)``;
const UserList = ({users, onShowUser}) => {
    return (
        <List>
            {users.map((user, index) => {
                const {fullName, groupId} = user;
                return (
                    <Line key={`${fullName}_${groupId}`} onClick={() => onShowUser(user)}>
                        <div>
                            {index + 1} {fullName}
                        </div>
                        <div><ImgButton/></div>
                    </Line>
                );
            })}
        </List>
    )
}

const Separated = styled.div`
display:flex;
flex-direction: column;
width: 50%;
`;
const UserName = styled.div`
font-weight: bold;
font-size: 24px;
line-height: 28px;
color: #000000;
margin-bottom: 28px;
`;

const ClosedTasks = styled.div`
display: flex;
flex-direction: column;
`;
const ClosedTasksTitle = styled.div`
font-weight: bold;
font-size: 17px;
line-height: 28px;
color: #000000;
margin-bottom: 16px;
`;


const AddTasksAligner = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 40px;
`;

const CustomTableButton = styled(TableButton)`
width: 150px;
margin-bottom: 40px;
`;

const Li = styled.li`
:not(:first-child){
margin-top: 24px;
}
`;
const Admin = () => {
    const [statistics, setStatistics] = useState([]);
    const [users, setUsers] = useState([]);
    const [userToShow, setUserToShow] = useState({});

    useEffect(async () => {
        const allTests = await sendHttpRequest({
            url: API_TEST_GETALL,
            method: 'GET',
        });
        const allUsers = await sendHttpRequest({
            url: API_ALL,
            method: 'GET',
        });
        setUsers(allUsers);
        setStatistics(allTests);
    }, []);

    const onShowUser = (user) => {
        console.log(user);
        setUserToShow(user);
    };

    const userStatistics = statistics.filter(s => s.user?.groupId === userToShow?.groupId && s.user?.fullName === userToShow?.fullName)[0] || {};
    return (
        <Page>
            <Container>
                {userToShow.groupId ? (
                    <FlexContainerRow>
                        <Separated>
                            <CustomTableButton onClick={() => setUserToShow({})}>Назад</CustomTableButton>
                            <UserName>{userToShow.fullName}, группа {userToShow.groupId}</UserName>
                            <ClosedTasks>
                                <ClosedTasksTitle>Завершенные задания</ClosedTasksTitle>
                                {userStatistics.results?.rightAnswersCount && (
                                    <TaskInfo task={{
                                        name: 'Настройка IED на прием- передачу GOOSE-сообщений',
                                    }} type="finished" rightAnswersCount={userStatistics.results?.rightAnswersCount} />
                                )}
                            </ClosedTasks>
                        </Separated>
                        <Separated>Statistics</Separated>
                    </FlexContainerRow>
                ) : (
                <>
                    <FirstContainer>
                        <MiddleTable headerIcon={profileIcon} headerText="Список обучающихся" backgroundColor="#2A5EA1">
                            <UserList users={users} onShowUser={onShowUser}/>
                        </MiddleTable>
                        <MiddleTable headerText="Добавление заданий">
                            <ul>
                                {tasksToAdd.map(text => (
                                    <Li>{text}</Li>
                                ))}
                            </ul>
                            <AddTasksAligner>
                                <TableButton>Добавить задание</TableButton>
                            </AddTasksAligner>
                        </MiddleTable>
                    </FirstContainer>
                    <BigTable headerText="Аналитика по заданиям" headerIcon={statIcon}>
                        <FlexContainerRow>
                            <Stats>
                                <img src={StatsAdmin1} alt="Stats1" />
                                Средний балл за октябрь 2020
                                <TableButton>Подробнее</TableButton>
                            </Stats>
                            <Stats>
                                <img src={StatsAdmin2} alt="Stats2" />
                                Средний прогресс по курсу группы 1234
                                <TableButton>Подробнее</TableButton>
                            </Stats>
                        </FlexContainerRow>
                    </BigTable>
                </>
                )}
            </Container>
        </Page>
    );
};

export default Admin;
