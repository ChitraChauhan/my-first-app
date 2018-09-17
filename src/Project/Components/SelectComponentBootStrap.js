import React, { Component } from 'react'
import Service from '../../service'
import { FormGroup, FormControl, ControlLabel, Col } from 'react-bootstrap';

export default class SelectComponentBootStrap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: []
        }
        this.service = new Service();
    }

    fetchRecords() {
         let options = {
            data: {
                _domainContext: {},
            },
            limit: 5,
            offset: 0,
            sortBy: null
        }
        this.service.getData(this.props.entity, options).then(res => res.json())
            .then(result =>
                this.setState({
                    children: result.data,
                })
            )
    }

    componentDidMount() {
        this.fetchRecords()
    }

    getValue(r, text) {
        let objValue = r;
        const fields = text.split('.');
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            objValue = objValue[field];
        }
        return objValue;
    }

    render() {
        const { id, label, name, valueMember, displayMember, multi } = this.props;
        return (
            <div>
                <FormGroup controlId={id}>
                    <Col sm={1} componentClass={ControlLabel}>{label}</Col>
                    <Col sm={10}>
                        <FormControl componentClass="select" multiple={multi}
                            name={name}
                            onChange={(e) => this.props.onChange(e)}>
                            {this.state.children.map((r, index) => (
                                <option key={index} value={r[valueMember].toString()}>{this.getValue(r, displayMember)}</option>
                            ))
                            }
                        </FormControl>
                    </Col>
                </FormGroup>

            </div>
        );
    }
}

   