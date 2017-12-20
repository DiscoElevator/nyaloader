import React from 'react';
import {fetchUserData} from 'api';
import {Header} from './header';

export class HeaderWithData extends React.Component {
    state = {
        user: null
    };

    componentDidMount() {
        fetchUserData().then(data => {
            this.setState(() => ({
                user: {
                    firstName: data.first_name,
                    lastName: data.last_name
                }
            }))
        });
    }

    render() {
        return (
            <Header user={this.state.user} />
        );
    }
}