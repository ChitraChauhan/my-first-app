import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import List from './List';
// import Form from './Form'
import { Navigator } from 'react-onsenui';
import FormContainer from './Project/FormContainer';
import { ListContainer } from './Project/ListContainer';


class App extends Component {

    // let autoId = 1;
    // state = {
    //     record: null,
    //     data: [
    //         { id: autoId++, name: 'Abc', mobile: '123456789' },
    //         { id: autoId++, name: 'Xyz', mobile: '987654321' }
    //     ],
    // }
    // handleRecordEdit(data) {
    //     this.setState({ record: data });
    // }
    // handleRecordDelete(record) {
    //     this.setState(prevState => {
    //         return {
    //             data: prevState.data.filter(x => x.id !== record.id),
    //         };
    //     });
    // }
    // handleSubmit(record) {
    //     if (!record.id) { // insert
    //         const newRecord = { ...record };
    //         newRecord.id = autoId++;
    //         this.setState(prevState => {
    //             return {
    //                 record: null,
    //                 data: [...prevState.data, newRecord],
    //             };
    //         })
    //     } else { //update
    //         const recordIndex = this.state.data.findIndex(x => x.id === record.id);
    //         this.setState(prevState => {
    //             prevState.data[recordIndex] = record;
    //             return {
    //                 record: null,
    //                 data: [...prevState.data],
    //             };
    //         })
    //     }
    // }
    // render() {
    //     console.log("render of App")
    //     const { record, data } = this.state;
    //     return (
    //         <div>
    //             <h1> Contact  App </h1>
    //             <Form
    //                 record={record}
    //                 onSave={this.handleSubmit.bind(this)} />
    //             <br />
    //             <List
    //                 data={data}
    //                 onEdit={this.handleRecordEdit.bind(this)}
    //                 onDelete={this.handleRecordDelete.bind(this)}
    //             />
    //         </div>
    //     )
    // }
    render() {
        let counter = 1;
        // const routes = [
        //     { path: "/form", component: FormContainer },
        //     { path: "/list", component: ListContainer },
        // ]
        return (
            <Navigator
                renderPage={(route, navigator) => {
                    const PageComponent = route.component;
                    return <PageComponent navigator={navigator} key={`'route_'${counter++}`} route={route} />
                }}
                initialRoute={{
                    name: "form",
                    component: FormContainer
                }}
            />
        )
    }
}

export default App