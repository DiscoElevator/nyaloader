import React from 'react';
import {CONFIG_UPDATE, CONFIG_GET} from 'constants/events';

const {ipcRenderer} = window.require('electron');

export const withConfig = (WrappedComponent) => {
    return class ConfigHOC extends React.Component {
        state = {
            config: null
        };

        componentDidMount() {
            ipcRenderer.on(CONFIG_UPDATE, this.configUpdateHandler);
            ipcRenderer.send(CONFIG_GET);
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