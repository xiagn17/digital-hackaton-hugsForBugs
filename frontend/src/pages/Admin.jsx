import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import {sendHttpRequest} from "../utils/sendHttpRequest";
import {API_TEST_GETALL} from "../const/API_URL";


const Container = styled.div`
display: flex;
flex-direction: column;
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
        <Container>
            {statistics.map(({results, user}) => {
                return (
                    <div>{user.fullName} сделал {results.rightAnswersCount} правильных ответов в первом тесте</div>
                );
            })}
        </Container>
    );
};

export default Admin;
