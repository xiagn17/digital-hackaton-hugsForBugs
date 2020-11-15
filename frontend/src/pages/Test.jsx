import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components'
import TestQuestions from '../TestQuestions';
import { sendHttpRequest } from "../utils/sendHttpRequest";
import { API_TEST_CREATE } from "../const/API_URL";
import Header from "../components/Header";
import Routes from "../const/Routes";
import TaskDetails from './TaskDetails';
const icon = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 19C8.875 19 8.25 18.75 7.75 18.25L2.75 13.25C1.75 12.25 1.75 10.75 2.75 9.75C3.75 8.75 5.375 8.75 6.25 9.75L9.5 13L17.75 4.75C18.75 3.75 20.25 3.75 21.25 4.75C22.25 5.75 22.25 7.25 21.25 8.25L11.25 18.25C10.75 18.75 10.125 19 9.5 19Z" fill="white" />
</svg>;


const Container = styled.div`
display: flex;
flex-direction: column;
padding-left: 122px;
padding-top: 40px;
font-family: Tahoma;
`;

const Circles = styled.div`
display: flex;
flex-direction: row;
font-size: 24px;
margin-bottom: 60px;
`;

const Circle = styled.div`
width: 48px;
height: 48px;
background: ${props => props.current ? "#2A5EA1" : "#ACC7F7"};
border-radius: 50%;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
color: ${props => props.current ? "white" : "#003572"};

:not(:first-child) {
margin-left: 24px;
}
`;



const QuestionContainer = styled.div`
display: flex;
flex-direction: column;
color: black
`;
const QuestionTitle = styled.div`
font-weight: bold;
font-size: 24px;
line-height: 32px;
`;
const Answer = styled.div`
display: flex;
flex-direction: row;
margin-top: 20px;
align-items: center;
`;
const AnswerButton = styled.input`
margin: 0 10px 0 0 !important;
`;
const AnswerText = styled.label`
font-size: 17px;
line-height: 24px;
color: ${props => props.withColor ? (props.isRight ? 'green' : 'red') : 'black'}
`;

const Question = ({ data, onChangeAnswer, disabledInput, checkedAnswer, isRight, withColor }) => {
    const { question, answers } = data;
    const onChange = (e) => {
        onChangeAnswer(e.target.value, e.target);
    };
    return (
        <QuestionContainer>
            <QuestionTitle>{question}</QuestionTitle>
            {answers.map((answer) => {
                return (
                    <Answer>
                        <AnswerButton
                            id={answer.number}
                            name={question}
                            onChange={onChange}
                            value={answer.number}
                            type="radio"
                            disabled={disabledInput}
                            checked={checkedAnswer ? Number(answer.number) === Number(checkedAnswer) : null}
                        />
                        <AnswerText
                            htmlFor={answer.number}
                            isRight={isRight && Number(answer.number) === Number(checkedAnswer)}
                            withColor={withColor && Number(answer.number) === Number(checkedAnswer)}
                        >{answer.text}</AnswerText>
                    </Answer>
                )
            })}
        </QuestionContainer>
    );
};


const NextQuestion = styled.button`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
padding: 0 !important;
width: 197px;
height: 36px;
background: #2A5EA1;
box-shadow: 0px 4px 8px rgba(0, 53, 114, 0.15);
border-radius: 24px;
font-size: 16px;
color: #FFFFFF;
margin-top: 25px;
outline: none;
`;



const ResultsText = styled.div`
font-weight: bold;
font-size: 24px;
line-height: 28px;
color: #2A5EA1;
margin-bottom: 60px;
`;

function getRightAnswersCountByResults(results) {
    return TestQuestions.reduce((acc, cur) => {
        const curId = cur.id;
        const answerNumber = results[curId];
        const answer = cur.answers.find(a => Number(a.number) === Number(answerNumber));

        if (answer.isRight) {
            return ++acc;
        }
        return acc;
    }, 0)
}
const Results = ({ results }) => {
    const rightAnswers = getRightAnswersCountByResults(results);

    return (
        <ResultsText>Результат: {rightAnswers} правильных ответов из {TestQuestions.length}</ResultsText>
    );
};

const HeaderText = styled.div`
font-size: 24px;
line-height: 20px;

display: flex;
align-items: center;

color: #2A5EA1;
`;
const HeaderButton = styled.button`
display: flex;
height: 36px;

flex-direction: row;
align-items: center;
justify-content: center;

background: #2A5EA1;
box-shadow: 0px 4px 8px rgba(0, 53, 114, 0.15);
border-radius: 24px;
font-size: 16px;
line-height: 20px;
color: white;
outline: none;
`;
const Test = () => {
    const [results, setResults] = useState({});
    const [currentQuestion, setQuestion] = useState(1);
    const [currentAnswer, setAnswer] = useState(0);
    const [isFinished, setFinished] = useState(false);
    const [radioBut, setRadioBut] = useState(null);
    const step = 1;
    const totalSteps = 2;

    const sendToServer = async (res, rightAnswersCount) => {
        const sendTest = await sendHttpRequest({
            url: API_TEST_CREATE,
            data: {
                results: {
                    ...res,
                    rightAnswersCount
                }
            },
            method: 'POST',
        });
    };

    const onChangeAnswer = (answerNumber, target) => {
        setAnswer(answerNumber);
        setRadioBut(target);
    }

    const questionsNumber = TestQuestions.length;
    const onNextQuestion = () => {
        const res = { ...results, [currentQuestion]: currentAnswer };
        setResults(res);
        if (questionsNumber === currentQuestion) {
            setFinished(true);
            sendToServer(res, getRightAnswersCountByResults(res));
            return;
        }
        setQuestion(currentQuestion + 1);
        setAnswer(0);
        radioBut.checked = false;
    };

    const history = useHistory()
    const goHome = () => {
        history.push(Routes.home.path)
    }
    return (
        <>
            <Header>
                <HeaderText>
                    {`Часть ${step}/${totalSteps}. Тест`}
                </HeaderText>
                {isFinished && <HeaderButton onClick={goHome}>
                    Завершить
                </HeaderButton>}
            </Header>
            <Container>
                {isFinished ? (
                    <>
                        <Results results={results} />
                        {TestQuestions.map(q => {
                            const answerNumber = results[q.id];
                            const isRight = q.answers.filter(a => Number(a.number) === Number(answerNumber))[0].isRight;
                            return (
                                <>
                                    <div style={{ marginBottom: '10px', marginTop: '70px' }}>Вопрос {q.id}</div>
                                    <Question data={q} disabledInput={true} checkedAnswer={answerNumber} isRight={isRight} withColor={true} />
                                </>
                            );
                        })}
                    </>
                ) : (
                        <>
                            <Circles>{TestQuestions.map(({ id }) => {
                                return (
                                    <Circle key={id} current={id === currentQuestion}>{currentQuestion > id ? icon : id}</Circle>
                                );
                            })}</Circles>
                            <Question data={TestQuestions.filter(({ id }) => id === currentQuestion)[0]} onChangeAnswer={onChangeAnswer} />
                            <NextQuestion disabled={currentAnswer === 0} onClick={onNextQuestion}>{questionsNumber === currentQuestion ? 'Узнать результат' : 'Следующий вопрос'}</NextQuestion>
                        </>
                    )}
            </Container>
            <TaskDetails
                title="Настройка IED на прием-передачу GOOSE-сообщений"
                content={(
                    <>
                        <span>Задание состоит из практической и теоретической части (15 вопросов). </span>
                        <br />
                        <span>Ориентировочное время выполнения составит 20 минут.</span>
                    </>
                )}
            />
        </>
    );
};

export default Test;
