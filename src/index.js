import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import { FormContainer as App } from './Partner/FormContainer';
// import { FormContainerBootStrap as App } from './Project/FormContainerBootStrap';
// import { OnsenComponents as App } from './OnsenUi/OnsenComponents';
// import {OnsenTabber as App} from './OnsenUi/OnsenTabber';
// import { NavigatorComponent as App } from './OnsenUi/OnsenNavigator';
import { FormContainer as App } from './Project/FormContainer';

// import { Component } from 'react';
// class Form extends Component {
//     state = {
//         form: {
//             name: '',
//             description: ''
//         },
//     }
//     onDataChange(e) {
//         this.setState({ form: { ...e } })
//     }
//     alert() {
//         alert("hiee...", this.state.form.name)
//     }
//     render() {
//         const { form } = this.state;
//         return (
//             <form>
//                 <input placeholder="Name" type="text" value={form.name} onChange={e => this.onDataChange({ ...form, name: e.target.value })} />
//                 <input placeholder="Description" type="text" value={form.description} onChange={e => this.onDataChange({ ...form, description: e.target.value })} />
//                 <button onClick={() => this.alert()}> Submit </button>
//             </form>
//         )
//     }
// }

// class List extends Component {
//     state = {
//         list: [
//             {
//                 name: 'abc',
//                 description: 'desc1'
//             },
//             {
//                 name: 'xyz',
//                 description: 'desc2'
//             }
//         ]
//     };
//     render() {
//         return (
//             <div>
//                 <h1> List Component </h1>
//                 {console.log(this.state.list)}
//             </div>
//         )
//     }
// }

// class App extends Component {

//     render() {
//         return (
//             <div>
//                 <Form
//                 // onDataChange={e => this.setState({ form: { ...e } })}
//                 />
//                 <List />
//             </div>
//         )
//     }
// }

ReactDOM.render(<App />, document.getElementById('root'));

 // generated code post-JSX processing
// ReactDOM.render(
//     React.createElement(App, null), document.getElementById('root')
//   );
