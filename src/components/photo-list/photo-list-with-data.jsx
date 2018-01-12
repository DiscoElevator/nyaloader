import React from 'react';
import {fetchPhotos} from 'api';
import {PhotoListWithToolbar} from './photo-list-with-toolbar';

export class PhotoListWithData extends React.Component {
    state = {
        photos: []
    };

    componentDidMount = () => this.fetchData(this.props.startFrom, this.props.config);

    componentWillReceiveProps = ({startFrom, config}) => {
        if ((startFrom !== this.props.startFrom) || (config !== this.props.config)) {
            this.fetchData(startFrom, config);
        }
    };

    fetchData(startFrom, config) {
        if (!config) {
            return;
        }
        const {chatId, pageSize} = config;
        if (!chatId) {
            return;
        }

        this.props.onLoadStart();
        fetchPhotos(chatId, startFrom, pageSize).then(res => {
            const photos = res.items.map(item => item.attachment.photo);
            this.setState(() => ({photos}));
            this.props.onLoadEnd(res.next_from);
        });
    }

    render() {
        return (
            <PhotoListWithToolbar
                photos={this.state.photos}
                {...this.props}
            />
        )
    }
}