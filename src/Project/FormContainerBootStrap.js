import React, { Component } from 'react';
import RestAPI from '../rest-api';
import ListContainer from './ListContainer';
import SelectComponentBootStrap from './Components/SelectComponentBootStrap';
import Service from '../service';
import { FormGroup, FormControl, ControlLabel, Col, Panel, Form, Button } from 'react-bootstrap';

const initialForm = {
    name: '',
    fullName: '',
    company: '',
    membersUserSet: [],
    projectTypeSelect: '',
    timesheetLineList: []
}

export class FormContainerBootStrap extends Component {
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
            memberlist: [
                { id: '' }
            ],
            loggedTimeList: [
                { id: '' }
            ],
        }
        this.restAPI = new RestAPI();
        this.service = new Service();
    }

    fetchData() {
        const { limit, searchInput, offset } = this.state;
        let options = {
            fields: [
                "fromDate",
                "code",
                "parentProject",
                "clientPartner",
                "toDate",
                "dueDate",
                "name",
                "projectTypeSelect",
                "assignedTo",
                "isProject",
                "attrs",
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

    onChange(e) {
        const { form } = this.state;
        let name = e.target.name;
        let value = e.target.value;
        form[name] = value;
        this.setState((prevState, props) => {
            return { form };
        })
    };

    handleMembersSelection(e) {
        let memberlist = [];
        const options = e.target.options;
        const members = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                const result = members.findIndex(id => id === options[i].value)
                if (result === -1) {
                    members.push(options[i].value);
                }
            }
        }
        this.setState({
            form: { ...this.state.form, membersUserSet: members }
        });
        for (let i = 0; i < members.length; i++) {
            memberlist.push({ id: members[i] });
        }
        this.setState({ memberlist })
    }

    handleLoggedTimeSelection(e) {
        let loggedTimeList = [];
        const options = e.target.options;
        const loggedTime = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                const result = loggedTime.findIndex(id => id === options[i].value)
                if (result === -1) {
                    loggedTime.push(options[i].value);
                }
            }
        }
        this.setState({
            form: { ...this.state.form, timesheetLineList: loggedTime }
        });
        for (let i = 0; i < loggedTime.length; i++) {
            loggedTimeList.push({ id: loggedTime[i] });
        }
        this.setState({ loggedTimeList })
    }

    handlePrevPage() {
        const { offset, limit } = this.state;
        const newOffset = Math.floor(offset - limit);
        this.setState({ offset: newOffset }, () => this.fetchData());
    }

    handleNextPage() {
        const { offset, limit } = this.state;
        const newOffset = Math.floor(offset + limit);
        this.setState({ offset: newOffset }, () => this.fetchData());
    }

    onDelete(id) {
        const { list } = this.state;
        console.log("Delete id", id)
        list.splice(id, 1);
        this.setState((prevState) => {
            return { list };
        })
        this.restAPI.delete('com.axelor.apps.project.db.Project', id).then(res => res.json())
    };

    onUpdate(record) {
        let id = record.id;
        console.log("Update Id", id)

        //----dynamic update----
        const { list } = this.state;
        const findIndex = this.findIndex(id);
        //console.log(list[findIndex]);
        // let members = []
        // for (let i = 0; i < list[findIndex].membersUserSet.length; i++) {
        //     members.push({ ...list[findIndex].membersUserSet[i] });
        // }
        // console.log("members", members)
        // let loggedTime = []
        // for (let i = 0; i < list[findIndex].timesheetLineList.length; i++) {
        //     loggedTime.push({ ...list[findIndex].timesheetLineList[i]});
        // }timesheetArray
        // console.log("loggedTime", loggedTime)
        // const data = {
        //     id: list[findIndex].id,
        //     name: list[findIndex].name,
        //     projectTypeSelect: list[findIndex].prmembersUserSetojectTypeSelect,
        //     company: list[findIndex].company.id,
        //     members: members,  let timeList=[];
        //     loggedTime: loggedTime
        // }
        // console.log("data", dataformPayload)
        this.setState({
            form: { ...list[findIndex] }
        });

        //----static update----
        // const data = {
        //     name: '123SP',
        //     fullName: '123SP',
        //     projectTypeSelect: 1,
        //     timesheetLineList: [{ id: 3 }, { id: 4 }],
        //     membersUserSet: [{ id: 1 }, { id: 2 }],
        //     company: { id: 1 },
        //     version: 1
        // }
        // this.restAPI.update('com.axelor.apps.project.db.Project', data, id).then(res => res.json())
        //     .then((result => console.log("result", result)));
    };

    onReset() {
        this.setState({
            form: { ...initialForm }
        })
        //window.location.reload();
    }

    getSearchedInput(e) {
        this.setState({
            searchInput: e.target.value
        },()=>this.fetchData());
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
        }
        return sortedList
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
            timesheetLineList: this.state.loggedTimeList,
            membersUserSet: this.state.memberlist,
            company: { id: form.company },

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
        this.onReset();
    }

    render() {
        const { form, searchInput, offset, limit, total } = this.state;
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

                <SelectComponentBootStrap
                    id="id"
                    label="Company"
                    value={form.company}
                    entity='com.axelor.apps.base.db.Company'
                    displayMember='name'
                    name='company'
                    onChange={(e) => this.onChange(e)}
                    valueMember='id'>
                </SelectComponentBootStrap>

                <SelectComponentBootStrap
                    id="id"
                    label="Members"
                    value={form.membersUserSet}
                    entity='com.axelor.auth.db.User'
                    displayMember='fullName'
                    name='members'
                    onChange={(e) => this.handleMembersSelection(e)}
                    valueMember='id'
                    multi="true">
                </SelectComponentBootStrap>

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

                <SelectComponentBootStrap
                    id="id"
                    label="Logged Time"
                    value={form.timesheetLineList}
                    entity='com.axelor.apps.hr.db.TimesheetLine'
                    displayMember='timesheet.fullName'
                    name='timesheetLineList'
                    onChange={(e) => this.handleLoggedTimeSelection(e)}
                    valueMember='id'
                    multi="true">
                </SelectComponentBootStrap>

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

                <Panel bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">List of Projects</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <ListContainer list={this.getFilteredList()}
                            searchInput={searchInput}
                            offset={offset}
                            limit={limit}
                            total={total}
                            onDelete={(id) => this.onDelete(id)}
                            onUpdate={(record) => this.onUpdate(record)}
                            handleNextPage={() => this.handleNextPage()}
                            handlePrevPage={() => this.handlePrevPage()}
                            getSearchedInput={(value) => this.getSearchedInput(value)}
                        />
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}
export default FormContainerBootStrap