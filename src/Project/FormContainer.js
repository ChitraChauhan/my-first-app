import React, { Component } from 'react';
import RestAPI from '../rest-api';
import ListContainer from './ListContainer';
import Service from '../service';
import SelectComponent from './Components/SelectComponent';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Form, Button } from 'react-bootstrap';
// import { Navigator, Page } from 'react-onsenui';

const initialForm = {
    name: '',
    fullName: '',
    company: '',
    membersUserSet: [],
    projectTypeSelect: '',
    timesheetLineList: []
}

export class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: { ...initialForm },
            list: [],
            searchInput: '',
            offset: 0,
            limit: 5,
            total: 0,
            sortBy: "id",
        }
        this.restAPI = new RestAPI();
        this.service = new Service();

    }

    fetchData() {
        const { limit, offset, searchInput } = this.state;
        let options = {
            fields: [
                "name",
                "projectTypeSelect",
                "isProject",
                "company",
                "membersUserSet",
                "timesheetLineList"
            ],
            data: {
                criteria: [
                    { fieldName: "name", operator: "like", value: searchInput },
                ],
                operator: "and",
                _domain: `self.isProject = true and self.projectTypeSelect = :_xProjectTypeSelect`,
                _domainContext: { _fromProject: true, _xProjectTypeSelect: 1, _id: null, _model: "com.axelor.apps.project.db.Project" },
            },
            limit,
            offset,
            sortBy: [this.state.sortBy]
        }
        this.service.getData("com.axelor.apps.project.db.Project", options)
            .then((res) => res.json())
            .then(result =>
                this.setState({
                    list: result.data,
                    total: result.total,
                })
            );
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        console.log("Form:::componentWillUnmount")
    }

    onChange(e, key) {
        const { form } = this.state;
        //for react-select field
        if (key) {
            form[key] = e;
        }
        else {
            let name = e.target.name;
            let value = e.target.value;
            form[name] = value;
        }
        this.setState((prevState, props) => {
            return { form };
        })
    };

    handlePrevPage() {
        const { offset, limit } = this.state;
        const newOffset = Math.floor(offset - limit);
        this.setState({ offset: newOffset }, () => this.fetchData());
    }

    handleNextPage = () => {
        const { offset, limit } = this.state;
        const newOffset = Math.floor(offset + limit);
        this.setState({ offset: newOffset }, () => this.fetchData());
    }

    onDelete(record) {
        this.setState((prevState) => {
            return { list: prevState.list.filter(x => x.id !== record.id) }
        })
        // this.restAPI.delete('com.axelor.apps.project.db.Project', record.id).then(res => res.json())
    };

    onUpdate(record, navigator) {
        let id = record.id;
        console.log("Update Id", id)

        //----dynamic update----
        // const { list } = this.state;
        // const findIndex = this.findIndex(id);
        this.setState({
            form: { ...record }
        });

        //----static update----
        // const data = {
        //     name: 'Project aaa',
        //     fullName: 'Project aaa',
        //     projectTypeSelect: 1,
        //     timesheetLineList: [{ id: 1 }, { id: 2 }],
        //     membersUserSet: [{ id: 1 }, { id: 2 }],
        //     company: { id: 1 },
        //     version: 1
        // }
        // this.restAPI.update('com.axelor.apps.project.db.Project', data, id).then(res => res.json())
        //     .then((result => console.log("result", result)));
        console.log("page", navigator.pages)
        navigator.popPage();
    };

    onReset() {
        this.setState({
            form: { ...initialForm }
        })
        //window.location.reload();
    }

    getSearchedInput(e) {
        var debounce = require('debounce');
        this.setState({
            searchInput: e.target.value
        },
            debounce(() => this.fetchData(), 1000));
        // () => this.fetchData()
    }

    sortByKey(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : 1);
        });
    }

    getFilteredList() {
        const { list, sortBy } = this.state;
        let sortedList = []
        if (list) {
            sortedList = this.sortByKey(list, sortBy);
            return sortedList
        }
    }

    findIndex(id) {
        const { list } = this.state;
        return list.findIndex(record => record.id === id);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const { form } = this.state;
        const formPayload = {
            name: form.name,
            fullName: form.name,
            projectTypeSelect: form.projectTypeSelect,
            timesheetLineList: form.timesheetLineList,
            membersUserSet: form.membersUserSet,
            company: form.company
        };
        this.setState(prevState => {
            const { list, form } = prevState
            if (form.id) {
                const formIndex = this.findIndex(form.id);
                list[formIndex] = form;
                this.restAPI.update('com.axelor.apps.project.db.Project', list[formIndex], form.id)
                    .then(res => res.json())
                    .then(result => {
                        return {
                            list: [...list]
                        }
                    });
            }
            else {
                this.restAPI.add('com.axelor.apps.project.db.Project', formPayload).then(res => console.log('res', res));
                console.log('All data: ' + JSON.stringify(form));
            }
        });
        // this.onReset();
    }

    pushPage(navigator) {
        navigator.pushPage({
            component: ListContainer,
            navigator: navigator,
            list: this.getFilteredList(),
            searchInput: this.state.searchInput,
            offset: this.state.offset,
            limit: this.state.limit,
            total: this.state.total,
            onDelete: this.onDelete.bind(this),
            onUpdate: this.onUpdate.bind(this),
            handleNextPage: () => this.handleNextPage(),
            handlePrevPage: () => this.handlePrevPage(),
            getSearchedInput: this.getSearchedInput.bind(this)
        }, { animation: 'slide' })

    }

    render() {
        console.log("::::render form container")
        const { form } = this.state;
        const formInstance = (
            <Form horizontal onSubmit={(e) => this.handleFormSubmit(e)}>

                <FormGroup controlId="formname">
                    <Col sm={1} componentClass={ControlLabel}>Project Name</Col>
                    <Col sm={10}>
                        <FormControl
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={(e) => this.onChange(e)}
                            required="true" />
                    </Col>
                </FormGroup>

                <SelectComponent
                    label="Company:"
                    labelKey='name'
                    onChange={(e) => this.onChange(e, 'company')}
                    value={form.company}
                    multi={false}
                    entity='com.axelor.apps.base.db.Company'
                    isnestedFields='false' />

                <SelectComponent
                    label="Members Associated to:"
                    labelKey='fullName'
                    onChange={(e) => this.onChange(e, 'membersUserSet')}
                    value={form.membersUserSet}
                    multi={true}
                    entity='com.axelor.auth.db.User'
                    isnestedFields='false' />

                <FormGroup controlId="formprojecttype">
                    <Col sm={1} componentClass={ControlLabel}>Project Type Select</Col>
                    <Col sm={10}>
                        <FormControl componentClass="select"
                            name="projectTypeSelect"
                            value={form.projectTypeSelect}
                            onChange={(e) => this.onChange(e)}>
                            <option value="1">Project</option>
                            <option value="2">Project phase</option>
                        </FormControl>
                    </Col>
                </FormGroup>

                <SelectComponent
                    label="Logged Time:"
                    labelKey='timesheet.fullName'
                    onChange={(e) => this.onChange(e, 'timesheetLineList')}
                    value={form.timesheetLineList}
                    multi={true}
                    entity='com.axelor.apps.hr.db.TimesheetLine'
                    isnestedFields='true'
                    nestedField='timesheet' />

                <FormGroup>
                    <Col smOffset={1} sm={10}>
                        <Button bsStyle="primary" type="submit"> Submit </Button>
                    </Col>
                </FormGroup>

            </Form>
        );
        return (
            <div>
                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Project Form</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>  {formInstance}</Panel.Body>
                </Panel>
                <section style={{ margin: '16px', textAlign: 'center' }}>
                    <Button onClick={() => this.pushPage(this.props.navigator)}>
                        Open List
                    </Button>
                </section>
                {/* <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">List of Projects</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <ListContainerthis.props.navigator
                            list={this.getFilteredList()}
                            searchInput={searchInput}
                            offset={offset}
                            limit={limit}
                            total={total}
                            onDelete={(record) => this.onDelete(record)}
                            onUpdate={(record) => this.onUpdate(record)}
                            //to avoid writing arguments and call back
                            // onUpdate={this.onUpdate.bind(this)}                            
                            handleNextPage={() => this.handleNextPage()}
                            handlePrevPage={() => this.handlePrevPage()}
                            getSearchedInput={(value) => this.getSearchedInput(value)}/>
                    </Panel.Body>
                     </Panel> */}
            </div>
        )
    }
}

export default FormContainer