import React from 'react';
import {PhotoList} from './photo-list';
import {SHOW_SELECTED} from 'constants/filters';

export class PhotoListWithFilter extends React.Component {
    filterPhotos = () => {
        const {photos, selectedPhotos, filter} = this.props;
        return filter === SHOW_SELECTED ? selectedPhotos : photos;
    };

    render() {
        return (
            <PhotoList
                {...this.props}
                photos={this.filterPhotos()}
            />
        );
    }
}