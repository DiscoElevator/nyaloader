import React from 'react';
import EVENTS from 'constants/events';

const {ipcRenderer} = window.require('electron');

export const withConfig = (WrappedComponent) => {
    return class ConfigHOC extends React.Component {
        state = {
            config: null
        };

        componentDidMount() {
            ipcRenderer.on(EVENTS.CONFIG_UPDATE, this.configUpdateHandler);
            ipcRenderer.send(EVENTS.CONFIG_GET);
        }

        componentWillUnmount() {
            ipcRenderer.removeListener(this.configUpdateHandler);
        }

        configUpdateHandler = (event, config) => this.setState({config});

        render() {
            return (
                <WrappedComponent config={this.state.config} />
            );
        }
    }
};