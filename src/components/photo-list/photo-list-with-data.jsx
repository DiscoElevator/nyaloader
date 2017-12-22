import React from 'react';
import {fetchPhotos} from 'api';
import {PhotoList} from './photo-list';

export class PhotoListWithData extends React.Component {
    state = {
        photos: []
    };

    componentDidMount = () => this.fetchData(this.props.startFrom);

    componentWillReceiveProps = ({startFrom}) => {
        if (startFrom !== this.props.startFrom) {
            this.fetchData(startFrom);
        }
    };

    fetchData(startFrom) {
        this.props.onLoadStart();
        fetchPhotos('2000000002', startFrom).then(res => { // TODO replace hardcode
            const photos = res.items.map(item => item.attachment.photo);
            this.setState(() => ({photos}));
            this.props.onLoadEnd(res.next_from);
        });
    }

    render() {
        return (
            <PhotoList photos={this.state.photos} />
        )
    }
}