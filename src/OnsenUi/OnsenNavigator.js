import React, { Component } from 'react';
import { Toolbar, Button, Page, Navigator, BackButton , ToolbarButton, Icon } from 'react-onsenui';
import ons from 'onsenui';

var index = 1;
export class NavigatorComponent extends Component {

    renderNavigatorToolbar(route, navigator) {
        const backButton = route.hasBackButton
            ? <BackButton onClick={() => this.handleNavigatorClick(navigator)}>Back</BackButton>
            : null;

        return (
            <Toolbar>
                 <ToolbarButton>
                        <Icon icon='fa-th-large' />
                    </ToolbarButton>
                <div className='left'>{backButton}</div>
                <div className='center'>{route.title}</div>
            </Toolbar>
        );
    }

    handleNavigatorClick(navigator) {
        console.log("navigator",navigator)
        ons.notification.confirm('Do you really want to go back?')
            .then((response) => {
                if (response === 1) {
                    navigator.popPage();
                }
            });
    }

    pushPage(navigator) {
        navigator.pushPage({
            title: `Another page ${index}`,
            hasBackButton: true
        });
        index++;
    }

    renderPage(route, navigator) {
        return (
            <Page key={route.title} renderToolbar={() => this.renderNavigatorToolbar(route, navigator)}>
                <section style={{ margin: '16px', textAlign: 'center' }}>
                    <Button onClick={() => this.pushPage(navigator)}>
                        Push Page
              </Button>
                </section>
            </Page>
        );
    }
    render() {
        return (
            <Navigator
                swipeable
                renderPage={(route, navigator) => this.renderPage(route, navigator)}
                initialRoute={{
                    title: 'First page',
                    hasBackButton: false
                }} />
        )
    }
}
export default NavigatorComponent