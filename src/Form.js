import React, { Component } from 'react';

const defaultRecord = {
    id: null,
    name: '',
    mobile: '',
};
class Form extends Component {
    state = { ...defaultRecord };

    // to prevent extra rerender
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.record === nextProps.record && this.state === nextState) {
            console.log("form:::shouldcomponentupdate==>false")
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.record && nextProps.record.id && this.state.id !== nextProps.record.id) {
            console.log("componentWillRecieveProps")
            this.setState(nextProps.record);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // save callback
        console.log("this.state",this.state)
        this.props.onSave(this.state);
        // reset record
        this.setState(defaultRecord);
    }

    render() {
        console.log("render of Form")
        
        const onChange = (e) => this.setState({ [e.target.name]: e.target.value });
        const { name, mobile } = this.state;
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} />
                <input type="number" name="mobile" placeholder="Mobile" value={mobile} onChange={onChange} />
                <button> Save </button>
            </form>
        )
    }
}

export default Form