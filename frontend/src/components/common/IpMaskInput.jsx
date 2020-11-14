import React, { forwardRef } from 'react';
import InputMask from "react-input-mask";

const IpMaskInput = forwardRef((props, ref) => {
    const { inputRef, ...other } = props;

    return (
        <InputMask
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/, '.', /[1-2]/, /[0-9]/, /[0-9]/]}
            maskChar="0"
            placeholderChar={'\u2000'}
            showMask
        />
    );
});

export default IpMaskInput;
