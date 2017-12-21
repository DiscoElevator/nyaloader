import React from 'react';
import {fetchPhotos} from 'api';
import {PhotoList} from './photo-list';

export class PhotoListWithData extends React.Component {
    state = {
        photos: []
    };

    componentDidMount() {
        fetchPhotos('2000000002').then(res => { // TODO replace hardcode
            const photos = res.items.map(item => item.attachment.photo);
            console.log(photos);
            this.setState(() => ({photos}));
        });
    }

    render() {
        return (
            <PhotoList photos={this.state.photos} />
        )
    }
}