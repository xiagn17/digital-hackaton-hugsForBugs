import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const burgerIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2C16 3.10457 15.1046 4 14 4H2C0.895431 4 0 3.10457 0 2Z" fill="white"/>
    <path d="M0 8C0 6.89543 0.895431 6 2 6H14C15.1046 6 16 6.89543 16 8C16 9.10457 15.1046 10 14 10H2C0.895431 10 0 9.10457 0 8Z" fill="white"/>
    <path d="M2 12C0.895431 12 0 12.8954 0 14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14C16 12.8954 15.1046 12 14 12H2Z" fill="white"/>
</svg>;

const Container = styled.div`
display: flex;
flex-direction: column;
box-sizing: border-box;
background: #FFFFFF;
border-radius: 8px;
width: 100%;
min-width: 350px;

`;

const Header = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding-left: 28px;
height: 68px;
width: 100%;
background: ${props => props.backgroundColor || '#59856A'};
border-top-left-radius: 8px;
border-top-right-radius: 8px;
`;

const HeaderText = styled.div`
font-size: 24px;
line-height: 28px;
color: white;
margin-left: 16px;
`;

const Body = styled.div`
border: 1px solid ${props => props.borderColor || '#59856A'};
border-bottom-left-radius: 8px;
border-bottom-right-radius: 8px;
width: 100%;
height: 100%;
min-height: 200px;
padding: 20px 24px;
`;


const Table = ({ headerIcon, headerText, backgroundColor, children, className }) => {
    return (
        <Container borderColor={backgroundColor} className={className}>
            <Header backgroundColor={backgroundColor}>
                <>
                    {headerIcon || burgerIcon}
                    <HeaderText>{headerText}</HeaderText>
                </>
            </Header>
            <Body>
                {children}
            </Body>
        </Container>
    );
};

export default Table;
