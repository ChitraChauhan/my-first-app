import React, { Component } from 'react';
import { Toolbar, ToolbarButton, Button, Page, Fab, Icon, ListItem, Checkbox, List, Input, Select, Switch, Row, Col, ListHeader, Tab, Tabbar } from 'react-onsenui';
import ons from 'onsenui';

export class OnsenComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vegetables: [
                'Tomato',
                'Cucumber',
                'Onion',
                'Eggplant',
                'Cabbage'
            ],
            username: '',
            password: '',
            modifier: '',
            checked: false,
        }
    }

    handleClick() {
        ons.notification.alert({
            message: 'Hello, world!'
        });
    }

    editSelects(e) {
        this.setState({ modifier: e.target.value });
    }

    handleSwitchChange(e) {
        this.setState({ checked: e.target.checked });
    }

    handleInputsubmit() {
        if (this.state.username === 'bob' && this.state.password === 'secret') {
            ons.notification.alert('Hello' + this.state.username + 'You are now signed in!');
        }
        else {
            ons.notification.alert('Username or password is incorrect!');
        }
    }

    renderToolbar() {
        const titles = ['Home', 'Settings'];
        return (
            <Toolbar>
                <div className='center'>Components</div>
                <div className='right'>
                    <ToolbarButton>
                        <Icon icon="ion-navicon, material:md-menu"></Icon>
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    renderRow(index) {
        const x = 40 + Math.round(5 * (Math.random() - 0.5)),
            y = 40 + Math.round(5 * (Math.random() - 0.5));
        const names = ['Max', 'Chloe', 'Bella', 'Oliver', 'Tiger', 'Lucy', 'Shadow', 'Angel'];
        const name = names[Math.floor(names.length * Math.random())];
        return (
            <ListItem key={index}>
                <div className='left'>
                    <img src={`http://placekitten.com/g/${x}/${y}`} className='list-item__thumbnail' alt="" />
                </div>
                <div>
                    {name}
                </div>
            </ListItem>
        );
    }

    renderCheckboxRow(row) {
        return (
            <ListItem key={row}>
                <label className='left'>
                    <Checkbox
                        inputId={`checkbox-${row}`} />
                </label>
                <label htmlFor={`checkbox-${row}`} className='center'>
                    {row}
                </label>
            </ListItem>
        );
    }

    render() {
        return (
            <div>
                <Page renderToolbar={() => this.renderToolbar()}>
                    <section style={{ margin: '16px' }}>
                        <Fab position='bottom right'>
                            <Icon icon="md-face" />
                        </Fab>
                        <Row>
                            <Col>
                                <Button style={{ margin: '6px' }} onClick={() => this.handleClick()}>Normal</Button>
                                <Button style={{ margin: '6px' }} modifier='quiet'>Quiet</Button>
                                <Button style={{ margin: '6px' }} modifier='outline'>Outline</Button>
                                <Button style={{ margin: '6px' }} modifier='cta'>Call to action</Button>
                                <Button style={{ margin: '6px' }} modifier='large'>Large</Button>
                            </Col>
                            <Col>
                                <Select id="choose-sel" value={this.state.modifier} modifier={this.state.modifier} onChange={(e) => this.editSelects(e)}>
                                    <option value="basic">Basic</option>
                                    <option value="material">Material</option>
                                    <option value="underbar">Underbar</option>
                                </Select>
                            </Col>
                            <Col>
                                <form>
                                    <p>
                                        <Input
                                            value={this.state.username}
                                            onChange={(e) => this.handleInputChange(e)}
                                            modifier='underbar'
                                            float
                                            placeholder='Username' />
                                    </p>
                                    <p>
                                        <Input
                                            value={this.state.password}
                                            onChange={(e) => this.handleInputChange(e)}
                                            modifier='underbar'
                                            type='current-password'
                                            float
                                            placeholder='Password' />
                                    </p>
                                    <p>
                                        <Button onClick={() => this.handleInputsubmit()}>Sign in</Button>
                                    </p>
                                </form>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <List
                                    dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                    renderRow={(index) => this.renderRow(index)}
                                    renderHeader={() => <ListHeader>Cute cats</ListHeader>} />
                            </Col>
                            <Col>
                                <p>
                                    {this.state.checked ? 'On' : 'Off'}
                                </p>
                                <p>
                                    <Switch checked={this.state.checked} onChange={(e) => this.handleSwitchChange(e)} />
                                </p>
                            </Col>
                            <Col>
                                <List
                                    dataSource={this.state.vegetables}
                                    renderRow={(row) => this.renderCheckboxRow(row)} />
                            </Col>
                        </Row>
                    </section>
                </Page>
            </div>
        )
    }
}
export default OnsenComponents