import React, { Component } from 'react';
import RestAPI from '../rest-api';
import { FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';
import ListContainer from './ListContainer'

let taskId = 0;

const initialForm = {
    name: '',
    fullName: '',
    emailAddress: {
        name: ''
    },
    fixedPhone: '',
    partnerAddresses: '',
    contactPartner: '',
    partnerCategory: '',
    description: '',
    isCustomer: true,
    partnerTypeSelect: 1,
};

export class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: { ...initialForm },
            list: [],
            updatedList: [],
            partnerCategoryList: [],
            partnerAddressList: [],
            searchInput: '',
            info: { _domain: "isCustomer = true" },
            fields:
                ["partnerCategory", "emailAddress.address", "fullName", "fixedPhone", "description"]
        }
        this.restAPI = new RestAPI();
    }

    //fetch one record
    // componentDidMount() {
    //     const restAPI = new RestAPI();
    //     const { list } = this.state;
    //     restAPI.fetch('com.axelor.apps.base.db.Partner', 85).then(res =>
    //         res.json().then(result => {
    //             const { data } = result;
    //             if (data) {
    //                 list.push(data[0])
    //                 this.setState((prevState) => {
    //                     return { list };
    //                 })
    //             }
    //         })
    //     );

    // }

    //search for all customers n display in list
    componentDidMount() {

        this.restAPI.search('com.axelor.apps.base.db.Partner')
            .then(res => res.json())
            .then(result =>
                this.setState({
                    list: result.data,
                })
            )
        this.restAPI.search('com.axelor.apps.base.db.PartnerCategory')
            .then(res => res.json())
            .then(result =>
                this.setState({
                    partnerCategoryList: result.data,
                })
            )
        this.restAPI.search('com.axelor.apps.base.db.PartnerAddress')
            .then(res => res.json())
            .then(result =>
                this.setState({
                    partnerAddressList: result.data,
                })
            )
    }

    onChange(e) {
        const { form } = this.state;
        let name = e.target.name;
        let value = e.target.value;
        form[name] = value;
        this.setState((prevState, props) => {
            return { form };
        })

    }

    onUpdate(record) {
        //dynamic update
        let id = record.id;
        console.log("Update Id", id)
        //this.setState({ form: { ...record } })

        //static update
        const data = {
            firstName: 'Chitra',
            name: 'Chauhan',
            fullName: 'Chitra Chauhan',
            emailAddress: {
                address: 'chitra@gmail.com'
            },
            fixedPhone: '+985444444444',
            partnerAddressList: [{ address: { id: 248 } }, { address: { id: 157 } }],
            contactPartnerSet: [{ id: 48 }, { id: 32 }],
            partnerCategory: {
                id: 8
            },
            description: 'hello chitra',
            isCustomer: true,
            partnerTypeSelect: 1,
            version: record.version
        }
        this.restAPI.update('com.axelor.apps.base.db.Partner', data, id).then(res => res.json())
            .then((result => console.log("result", result)));
    }

    onDelete(id) {
        const { list } = this.state;
        console.log("Delete id", id)
        list.splice(id, 1);
        this.setState((prevState) => {
            return { list };
        })

        this.restAPI.delete('com.axelor.apps.base.db.Partner', id).then(res => res.json())
    }

    findIndex(id) {
        const { list } = this.state;
        return list.findIndex(record => record.id === id);
    }

    onReset() {
        // this.setState({
        //     form: { ...initialForm }
        // })

        window.location.reload();
    }

    onSearch() {
        const { searchInput, list, fields, info } = this.state;
        let updatedList = list.filter((record) => {
            return record.name.toLowerCase().search(searchInput) !== -1 || record.fullName.search(searchInput) !== -1;
        });
        this.setState({
            updatedList: updatedList,
            //list: updatedList
        });
        this.restAPI.search('com.axelor.apps.base.db.Partner', -1, 0, fields, info)
            .then(res => res.json())
            .then(result =>
                this.setState({
                    list: result.data,
                })
            )
    }

    getSearchedInput(e) {
        this.setState({
            searchInput: e.target.value.toLowerCase()
        });
    }

    getFilteredList() {
        const { searchInput, list, updatedList } = this.state;
        if (searchInput === '') {
            return list;
        }
        else return updatedList
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const { form } = this.state;
        const formPayload = {
            name: form.name,
            fullName: form.name,
            emailAddress: { address: form.emailAddress },
            fixedPhone: form.fixedPhone,
            partnerAddressList: [{ address: { id: form.partnerAddresses } }],
            contactPartnerSet: [{ id: form.contactPartner }],
            partnerCategory: { id: form.partnerCategory },
            description: form.description,
            selectedCustomerType: form.selectedCustomerType,
            isCustomer: true,
            partnerTypeSelect: 1,
        };
        this.setState(prevState => {
            const { list, form } = prevState;
            if (form.id) {
                const index = this.findIndex(form.id);
                if (index === -1) {
                    list.push({ ...form });
                }
                else {
                    list[index] = form
                }
                return { list }
            }
            else {
                form.id = ++taskId;
                list.push({ ...form });
                return { list }
            }
        });
        this.restAPI.add('com.axelor.apps.base.db.Partner', formPayload).then(res => console.log('res', res));
        console.log('All data: ' + JSON.stringify(this.state.form));
        this.onReset();
    }
    render() {
        const { form, list, partnerCategoryList, partnerAddressList, searchInput } = this.state;
        return (

            <div>

                <Panel header='Customer Form' bsStyle="primary">
                    <h3>Customer Form</h3>
                    <form onSubmit={(e) => this.handleFormSubmit(e)}>
                        <FormGroup>
                            <ControlLabel> FullName </ControlLabel>
                            <FormControl
                                type="text" name="name" value={form.name} placeholder="Enter first name and last name" onChange={(e) => this.onChange(e)} required="true" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel> Email Address </ControlLabel>
                            <FormControl
                                type="email" name="emailAddress" value={form.emailAddress.name || undefined} onChange={(e) => this.onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel> Fixed Phone </ControlLabel>
                            <FormControl
                                type="text" name="fixedPhone" value={form.fixedPhone} onChange={(e) => this.onChange(e)} required="true" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel> Partner Adresses </ControlLabel>
                            <FormControl componentClass="select" name="partnerAddresses" value={form.partnerAddresses} onChange={(e) => this.onChange(e)}>
                                {partnerAddressList.map((record, index) => (
                                    <option key={index} value={record.address.id}>{record.address.fullName}</option>)
                                )};
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel> Contact Partner </ControlLabel>
                            <FormControl componentClass="select" name="contactPartner" value={form.contactPartner} onChange={(e) => this.onChange(e)}>
                                {list.map((record, index) => (
                                    <option key={index} value={record.id}>{record.fullName}</option>)
                                )};
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Partner Category </ControlLabel>
                            <FormControl componentClass="select" name="partnerCategory" value={form.partnerCategory} onChange={(e) => this.onChange(e)}>
                                {partnerCategoryList.map((record, index) => (
                                    <option key={index} value={record.id}>{record.name}</option>)
                                )};
                             </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel> Description </ControlLabel>
                            <FormControl
                                type="textarea" name="description" value={form.description} onChange={(e) => this.onChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Button bsStyle="primary" type="submit"> Submit </Button>
                            <Button onClick={() => this.onReset()}>Reset</Button>
                        </FormGroup>
                    </form>
                </Panel>
                <Panel header="Retrieved Data" bsStyle="primary">
                    <ListContainer list={this.getFilteredList()}
                        searchInput={searchInput}
                        onUpdate={(e) => this.onUpdate(e)}
                        onDelete={(id) => this.onDelete(id)}
                        onSearch={() => this.onSearch()}
                        getSearchedInput={(e) => this.getSearchedInput(e)} />
                </Panel>

            </div>


        )
    }
}
export default FormContainer