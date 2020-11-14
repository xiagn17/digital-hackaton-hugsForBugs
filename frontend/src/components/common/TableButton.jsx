import React, { useState, useEffect } from 'react';
import styled from 'styled-components'


const ButtonContainer = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
background: #FFFFFF;
border: 1px solid #2A5EA1;
box-sizing: border-box;
border-radius: 24px;
height: 36px;

font-size: 16px;
line-height: 20px;
color: #2A5EA1;

outline: none;
`;

const TableButton = ({ onClick, children }) => {
    return (
        <ButtonContainer onClick={onClick}>
            {children}
        </ButtonContainer>
    );
};

export default TableButton;
