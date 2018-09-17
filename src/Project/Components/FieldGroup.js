import React from 'react';
import { FormControl, FormGroup, ControlLabel, Col } from 'react-bootstrap';

const FieldGroup = ({ id, label, ...props }) => (
    <FormGroup controlId={id}>
        <Col sm={1} componentClass={ControlLabel}>{label}</Col>
        <Col sm={10}>
            <FormControl {...props}>
            </FormControl>
        </Col>
    </FormGroup>
);

export default FieldGroup;
