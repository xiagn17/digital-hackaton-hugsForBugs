import React, {useEffect, useState} from 'react';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import Done from '@material-ui/icons/Done';
import styled from 'styled-components'
import Table from "../components/common/Table";
import Typography from '@material-ui/core/Typography';
import Page from '../components/Page';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Routes from "../const/Routes";
import TestQuestions from "../TestQuestions";
import {sendHttpRequest} from "../utils/sendHttpRequest";
import {API_TEST_CREATE, API_TEST_GET} from "../const/API_URL";

const unfinishedTasks = [
    {
        name: 'Настройка IED на прием- передачу GOOSE-сообщений',
        url: '/task',
    },
];

const completedTasks = [
    {
        name: 'Настройка IED на прием- передачу GOOSE-сообщений',
        url: '/task',
        errors: {
            theory: 2,
            practice: 1,
        },
    },
];

const DashboardWrapper = styled.div`
    background-Color: #F3F3F3;
    height: 100%;
    padding: 16px;
`;

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
    justify-content: space-between;
    margin-bottom: 47px;
`;

const LeftTable = styled(Table)`
    width: calc(70% - 12px);
`;
const RightTable = styled(Table)`
    width: calc(30% - 12px);
`;

const TableBody = styled.div`
    min-height: 500px;
`;

const DoneIcon = styled(Done)`
    color: #fff;
`;

const RightGridItem = styled(Grid)`
    margin-left: auto;
`;

const NameGridItem = styled(Grid)`
    font-size: 17px;
    margin-left: 15px;
    transform: translateY(-2px);
    max-width: ${props => `${props.maxWidth}px` || "none"};
`;

const StartTaskButton = styled.button`
    background: #FFFFFF;

    border: 1px solid #2A5EA1;
    box-sizing: border-box;
    border-radius: 24px;
    padding: 8px 24px;
    transition: 150ms all ease-in-out;
    cursor: pointer;

    &:hover {
        background-color: #2A5EA1;
        color: #fff;
    }
`;

const ErrorsGridContainer = styled(Grid)`
    padding-left: 40px;
    color: #C4C4C4;
    font-size: 14px;
`;

const DashboardHeader = () => {
    return (
        <>
            <Typography>Практическое задание 1/2</Typography>
        </>
    );
};

const Task = (props) => {
    const { task: { name, url }, rightAnswersCount, type } = props;

    const goToTask = () => {
        history.push(Routes.task.path)
    };

    const history = useHistory();

    if (type === 'finished') {
        if (!rightAnswersCount) {
            return null;
        }
        return (
            <Grid container direction="column">
                <Grid item container alignItems="flex-start">
                    <Grid item>
                        <DotIcon />
                    </Grid>
                    <NameGridItem item maxWidth={300}>
                        {name}
                    </NameGridItem>
                </Grid>
                <ErrorsGridContainer item container direction="column">
                    {/*<Grid item>*/}
                    {/*    Практическая часть: 2 ошибки*/}
                    {/*</Grid>*/}
                    <Grid item>
                        Тестовая часть: {rightAnswersCount} правильных ответов из {TestQuestions.length}
                    </Grid>
                </ErrorsGridContainer>
            </Grid>
        );
    }

    return (
        <Grid container alignItems="center">
            <Grid item>
                <DotIcon />
            </Grid>
            <NameGridItem item>
                {name}
            </NameGridItem>
            <RightGridItem item>
                <StartTaskButton onClick={goToTask}>
                    Приступить к выполнению
                </StartTaskButton>
            </RightGridItem>
        </Grid>
    );
};
export {Task as TaskInfo};
export default function Home() {
    const [ownStats, setOwnStats] = useState({});
    useEffect(async () => {
        const stats = await sendHttpRequest({
            url: API_TEST_GET,
            method: 'GET',
        });
        setOwnStats(stats)
    }, []);

    const rightAnswersCount = ownStats?.results?.rightAnswersCount;
    return (
        <Page headerContent={<DashboardHeader />}>
            <DashboardWrapper>
                <Container>
                    <FlexContainerRow>
                        <LeftTable headerText="Задания на выполнение" backgroundColor="#2A5EA1">
                            <TableBody>
                                {unfinishedTasks.map((task) => (
                                    <Task task={task} type="unfinished" />
                                ))}
                            </TableBody>
                        </LeftTable>
                        <RightTable headerText="Завершённые задачи" headerIcon={<DoneIcon />}>
                            <TableBody>
                                {completedTasks.map((task) => (
                                    <Task task={task} type="finished" rightAnswersCount={rightAnswersCount} />
                                ))}
                            </TableBody>
                        </RightTable>
                    </FlexContainerRow>
                </Container>
            </DashboardWrapper>
        </Page>
    );
}
