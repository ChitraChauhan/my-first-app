import React, { Component } from 'react';
import { Toolbar, Page, Tab, Tabbar } from 'react-onsenui';

export class OnsenTabber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    renderToolbar() {
        const titles = ['Home', 'Settings'];
        return (
            <Toolbar>
                <div className='center'>{titles[this.state.index]}</div>
            </Toolbar>
        );
    }

    renderTabs() {
        return [
            {
                content: <Page content="Welcome home" />,
                tab: <Tab label='Home' icon='md-home' />
            },
            {
                content: <Page content="Change the settings"/>,
                tab: <Tab label='Settings' icon='md-settings' />
            }
        ];
    }
    render() {
        return (
            <div>
                <Page renderToolbar={() => this.renderToolbar()}>
                    <Tabbar
                        swipeable={true}
                        position='auto'
                        index={this.state.index}
                        onPreChange={(event) => {
                            if (event.index !== this.state.index) {
                                this.setState({ index: event.index });
                            }
                        }}
                        renderTabs={() => this.renderTabs()} />
                </Page>
            </div>
        )
    }
}
export default OnsenTabber