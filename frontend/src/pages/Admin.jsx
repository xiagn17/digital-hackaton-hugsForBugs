import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {sendHttpRequest} from "../utils/sendHttpRequest";
import {API_TEST_GETALL} from "../const/API_URL";
import Page from "../components/Page";
import Table from "../components/Table";

const profileIcon = <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6C16 9.31371 13.7614 12 11 12C8.23858 12 6 9.31371 6 6C6 2.68629 8.23858 0 11 0C13.7614 0 16 2.68629 16 6Z" fill="white"/>
    <path d="M16 12.9C18.2 13.8 19.9 15.3 20.8 17.1C21.5 18.5 20.4 20 18.9 20H3.09997C1.59997 20 0.499973 18.5 1.19997 17.2C2.09997 15.4 3.79997 13.9 5.99997 13C6.59997 12.7 7.29997 12.8 7.79997 13C8.79997 13.6 9.79997 13.9 11 13.9C12.2 13.9 13.2 13.6 14.2 13C14.7 12.7 15.4 12.7 16 12.9Z" fill="white"/>
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
`;

const CustomTable = styled(Table)`
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
                    <CustomTable headerIcon={profileIcon} headerText="Список обучающихся" backgroundColor="#2A5EA1">
                        {statistics.map(({results, user}, index) => {
                            return (
                                <div>{index + 1} {user.fullName}</div>
                            );
                        })}
                    </CustomTable>
                    <CustomTable headerText="Добавление заданий">
                        heh
                    </CustomTable>
                </FlexContainerRow>
            </Container>
        </Page>
    );
};

export default Admin;
