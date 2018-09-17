import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { SearchInput, Page, Toolbar } from 'react-onsenui';

export class ListContainer extends Component {

    componentDidMount() {
        console.log("this.props", this.props.navigator)
    }

    componentWillUnmount() {
        console.log("List:::componentWillUnmount")
    }

    renderNavigatorToolbar() {
        return (
            <Toolbar>
                <div className='left'>
                    <Button style={{display: "block"}} onClick={() => this.props.navigator.popPage()} >Back</Button>
                </div>
                <div className='center'>List of Projects</div>
            </Toolbar>
        );
    }

    render() {
        console.log(":::::render list container")
        const { list, onUpdate, onDelete, offset, total, limit, getSearchedInput, handleNextPage, handlePrevPage, searchInput } = this.props.route;
        const listgroupInstance = (
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Project</td>
                            <td>Company</td>
                            <td>Project Type Select</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {list && list.map((data, index) =>
                            <TableRow key={index} record={data} onUpdate={() => onUpdate(data, this.props.navigator)} onDelete={() => onDelete(data)} />
                        )}
                    </tbody>

                </table>
            </div>
        );
        const isPrevDisable = offset === 0;
        const isNextDisable = offset + limit >= total;
        return (
            <Page renderToolbar={() => this.renderNavigatorToolbar()}>
                    <div style={{ float: 'right' }}>
                        {offset + 1 + ' to ' + (offset + limit <= total ? offset + limit : total) + ' of ' + total + ' '}
                        <i onClick={() => !isPrevDisable && handlePrevPage()}
                            style={{ paddingRight: '25px' }}
                            className={isPrevDisable ? "disabled" : "fa fa-chevron-left"} />
                        <i onClick={() => !(isNextDisable) && handleNextPage()}
                            className={isNextDisable ? "disabled" : "fa fa-chevron-right"} />
                    </div>
                    {/* <div> */}
                    {/* <form>
                        <FormGroup>
                            <Col sm={10}>
                                <FormControl
                                    type="text" placeholder="search..." value={searchInput} onChange={(e) => getSearchedInput(e)} />
                            </Col>
                        </FormGroup>
                    </form> */}
                    <div className='center' >
                        <section style={{ textAlign: 'center' }}>
                            <p>
                                <SearchInput
                                    placeholder='Search' value={searchInput} onChange={(e) => getSearchedInput(e)} />
                            </p>
                        </section>
                        {listgroupInstance}
                    </div>
            </Page>
        )
    }
}
class TableRow extends Component {
    render() {
        const { record, onUpdate, onDelete } = this.props;
        return (
            <tr>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.company && record.company.name}</td>
                <td>{record.projectTypeSelect}</td>
                <td>
                    <Button type="submit" bsStyle="primary" onClick={() => onUpdate(record, navigator)}>Update</Button>
                </td>
                <td>
                    <Button type="submit" bsStyle="primary" onClick={(record) => onDelete(record)}>Delete</Button>
                </td>
            </tr>
        );
    }
}

export default ListContainer