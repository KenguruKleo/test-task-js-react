import React from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import Alert from 'react-bootstrap/lib/Alert';

const FieldInput = ({ input, meta, type, placeholder, min, max }) => {
    return (
        <div>
            <FormControl
                type={type}
                placeholder={placeholder}
                min={min}
                max={max}
                {...input}
            />
            {meta.touched && meta.error && <Alert bsStyle="danger"><span className="error">{meta.error}</span></Alert>}
        </div>
    )
};

export default FieldInput;