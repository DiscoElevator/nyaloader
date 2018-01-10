import React from 'react';
import {PhotoListWithPagination} from './photo-list-with-pagination';

export class PhotoListWithSelection extends React.Component {
    state = {
        selectedPhotos: []
    };

    togglePhotoSelection = (photo) => this.setState(({selectedPhotos}) => {
        const newSelectedPhotos = [...selectedPhotos];
        const index = selectedPhotos.findIndex(item => item.id === photo.id);
        if (index > -1) {
            newSelectedPhotos.splice(index, 1);
        } else {
            newSelectedPhotos.push(photo);
        }
        return {
            selectedPhotos: newSelectedPhotos
        }
    });

    render() {
        return (
            <PhotoListWithPagination
                {...this.props}
                selectedPhotos={this.state.selectedPhotos}
                onPhotoClick={this.togglePhotoSelection}
            />
        );
    }
}