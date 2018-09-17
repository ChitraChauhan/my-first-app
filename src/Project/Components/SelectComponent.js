import React, { Component } from 'react'
import Service from '../../service'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { FormGroup, ControlLabel, Col } from 'react-bootstrap';

export default class SelectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
        }
        this.service = new Service();
    }

    fetchRecords() {
        // let options = {
        //     // fields: [
        //     //     "id",
        //     //     "name",
        //     //     "fullName"
        //     // ],
        //     data: {
        //         _domainContext: {},
        //     },
        //     limit: 5,
        //     offset: 0,
        //     sortBy: null
        // }
        this.service.getData(this.props.entity).then(res => res.json())
            .then(result =>
                this.setState({
                    children: result.data,
                })
            )
    }

    // fetchNestedRecords() {
    //     const { nestedField } = this.props;
    //     console.log(nestedField)
    //     let options = {
    //         fields:
    //             ["timesheet", "project",],
    //         data: {
    //             criteria: [],
    //             operator: "and",
    //             _domainContext: {_model: "com.axelor.apps.hr.db.TimesheetLine"},
    //         },
    //         limit: 5,
    //         offset: 0,
    //         sortBy: null
    //     }
    //     let nestedList = [];
    //     this.service.getData(this.props.entity, options).then(res => res.json())
    //         .then(result => {
    //             for (let j = 0; j < result.data.length; j++) {
    //                 console.log(result.data[j][`${nestedField}`])
    //                 nestedList.push(result.data[j][`${nestedField}`])
    //             }
    //         },
    //             this.setState({
    //                 children: nestedList,
    //             })
    //         )
    // }

    // componentDidMount() {
    //     if (this.props.isnestedFields === "true") {
    //         this.fetchNestedRecords()
    //     }
    //     else {
    //         this.fetchRecords()
    //     }
    // }

    componentDidMount(){
        this.fetchRecords();
    }

    getValue(r, text) {
        let objValue = r;
        const fields = text.split('.');
        let field;
        for (let i = 0; i < fields.length; i++) {
            field = fields[i];
            objValue = objValue[field];
        }
        return {objValue,field};
    }

    render() {
        const { onChange, labelKey, multi, value, label } = this.props;
        // let onChanged = {};
        let newLabelKey;
        if (this.props.isnestedFields === "true") {
            this.state.children.map((r, index) => {
               let nestedValue = this.getValue(r, labelKey)
               r[nestedValue.field]=nestedValue.objValue
                newLabelKey=nestedValue.field
                return nestedValue
            })
        }
        else {
            newLabelKey = labelKey
        }
        return (
            <div>
                <FormGroup>
                    <Col sm={1} componentClass={ControlLabel}>{label}</Col>
                    <Col sm={10}>
                        {/* {this.props.isnestedFields === "true" ? onChanged = (e) => (onChange(e), this.fetchNestedRecords())
                            : onChanged = (e) => (onChange(e), this.fetchRecords())} */}
                        <Select
                            valueKey='id'
                            labelKey={newLabelKey}
                            options={this.state.children}
                            onChange={(e) => onChange(e) || this.fetchRecords()}
                            value={value}
                            multi={multi} />
                    </Col>
                </FormGroup>

            </div>
        );
    }
}