import React, { Component } from 'react';

class List extends Component {

    // to prevent extra rerender
    shouldComponentUpdate(nextProps) {
        if (this.props.data === nextProps.data) {
            console.log("List::::shouldcomponentupdate==>false")
            return false;
        }
        return true;
    }

    render() {
        console.log("render of List")
        const { data, onEdit, onDelete } = this.props;
        return (
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Name </th>
                        <th> Age </th>
                        <th> Action </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((record) => (
                            <tr key={record.id}>
                                <td>{record.id}</td>
                                <td>{record.name}</td>
                                <td>{record.mobile}</td>
                                <td>
                                    <button onClick={() => onEdit(record)}> Edit </button>
                                    <button onClick={() => onDelete(record)}> Delete </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default List