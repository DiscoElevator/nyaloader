import React from 'react';
import {fetchImages} from 'api';
import {AttachmentList} from './attachment-list';

export class AttachmentListWithData extends React.Component {
    state = {
        images: []
    };

    componentDidMount() {
        fetchImages('2000000002').then(res => { // TODO replace hardcode
            const photos = res.items.map(item => item.attachment.photo);
            console.log(photos);
            this.setState(() => ({images: photos}));
        });
    }

    render() {
        return (
            <AttachmentList images={this.state.images} />
        )
    }
}