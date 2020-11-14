import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {sendHttpRequest} from "../utils/sendHttpRequest";
import {API_TEST_GETALL} from "../const/API_URL";
import Page from "../components/Page";
import Table from "../components/common/Table";
import TableButton from "../components/common/TableButton";

const profileIcon = <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6C16 9.31371 13.7614 12 11 12C8.23858 12 6 9.31371 6 6C6 2.68629 8.23858 0 11 0C13.7614 0 16 2.68629 16 6Z" fill="white"/>
    <path d="M16 12.9C18.2 13.8 19.9 15.3 20.8 17.1C21.5 18.5 20.4 20 18.9 20H3.09997C1.59997 20 0.499973 18.5 1.19997 17.2C2.09997 15.4 3.79997 13.9 5.99997 13C6.59997 12.7 7.29997 12.8 7.79997 13C8.79997 13.6 9.79997 13.9 11 13.9C12.2 13.9 13.2 13.6 14.2 13C14.7 12.7 15.4 12.7 16 12.9Z" fill="white"/>
</svg>;
const statIcon = <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.9091 0H9.09091C8.09091 0 7.27273 0.818182 7.27273 1.81818V16.3636C7.27273 17.3636 8.09091 18.1818 9.09091 18.1818H10.9091C11.9091 18.1818 12.7273 17.3636 12.7273 16.3636V1.81818C12.7273 0.818182 11.9091 0 10.9091 0Z" fill="white"/>
    <path d="M3.63636 9.09091H1.81818C0.818182 9.09091 0 9.90909 0 10.9091V16.3636C0 17.3636 0.818182 18.1818 1.81818 18.1818H3.63636C4.63636 18.1818 5.45455 17.3636 5.45455 16.3636V10.9091C5.45455 9.90909 4.63636 9.09091 3.63636 9.09091Z" fill="white"/>
    <path d="M16.3636 5.45455H18.1818C19.1818 5.45455 20 6.27273 20 7.27273V16.3636C20 17.3636 19.1818 18.1818 18.1818 18.1818H16.3636C15.3636 18.1818 14.5455 17.3636 14.5455 16.3636V7.27273C14.5455 6.27273 15.3636 5.45455 16.3636 5.45455Z" fill="white"/>
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
justify-content: space-between;
margin-bottom: 47px;
`;

const MiddleTable = styled(Table)`
width: calc(50% - 12px);
`;
const BigTable = styled(Table)`
width: calc(50% - 12px);
`;

const Admin = () => {
    const [statistics, setStatistics] = useState([]);
    useEffect(async () => {
        const allTests = await sendHttpRequest({
            url: API_TEST_GETALL,
            method: 'GET',
        });
        setStatistics(allTests);
    }, []);

    return (
        <Page>
            <Container>
                <FlexContainerRow>
                    <MiddleTable headerIcon={profileIcon} headerText="Список обучающихся" backgroundColor="#2A5EA1">
                        {statistics.map(({results, user}, index) => {
                            return (
                                <div>{index + 1} {user.fullName}</div>
                            );
                        })}
                        <TableButton>Подробнее</TableButton>

                    </MiddleTable>
                    <MiddleTable headerText="Добавление заданий">
                        heh
                    </MiddleTable>
                </FlexContainerRow>
                <BigTable headerText="Аналитика по заданиям" headerIcon={statIcon}>
                </BigTable>
            </Container>
        </Page>
    );
};

export default Admin;
