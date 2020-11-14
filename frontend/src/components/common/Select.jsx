import React from 'react';
import PropTypes from 'prop-types';

import SelectOption from "./SelectOption";

const Select = (props) => {
    const { value, onChange, options } = props;

    return (
        <div>
            {options.map((option) => (
                <SelectOption option={option} activeOption={value} onChange={onChange} key={option.label} />
            ))}
        </div>
    );
};

Select.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func,
}

export default Select;
