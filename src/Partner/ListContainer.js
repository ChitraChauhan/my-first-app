import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

class ListContainer extends Component {

    render() {
        const { list, searchInput } = this.props;

        return (
            <div>
                <h3>List of customers:</h3>
                <form>
                    <FormGroup>
                        <FormControl
                            type="text" placeholder="search..." value={searchInput} onChange={(e) => this.props.getSearchedInput(e)} />
                        <Button bsStyle="primary" onClick={() => this.props.onSearch()}> Search </Button>
                    </FormGroup>
                </form>
                <table className="table table-bordered">
                    <thead>

                        <tr>
                            <td>Id</td>
                            <td>FullName</td>
                            <td>Email Address</td>
                            <td>Fixed Phone</td>
                            <td>Description</td>
                            <td>Partner Category</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((data, index) =>
                            <TableRow key={index} record={data} onUpdate={() => this.props.onUpdate(data)} onDelete={() => this.props.onDelete(data)} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
class TableRow extends Component {
    render() {
        const { record } = this.props;
        return (
            <tr>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.emailAddress && record.emailAddress.name}</td>
                <td>{record.fixedPhone}</td>
                <td>{record.description}</td>
                <td>{record.partnerCategory && record.partnerCategory.name}</td>
                <td>
                    <Button type="submit" bsStyle="primary" onClick={() => this.props.onUpdate(record)}>Update</Button>
                </td>
                <td>
                    <Button type="submit" bsStyle="primary" onClick={() => this.props.onDelete(record)}>Delete</Button>
                </td>
            </tr>
        );
    }
}
export default ListContainer