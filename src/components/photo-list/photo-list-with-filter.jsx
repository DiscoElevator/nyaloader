import React from 'react';
import {PhotoList} from './photo-list';
import {SHOW_ALL, SHOW_SELECTED} from 'constants/filters';
import {Filter} from './filter';

export class PhotoListWithFilter extends React.Component {
    state = {
        filter: SHOW_ALL
    };

    handleFilterChange = filter => this.setState({filter});

    filterPhotos = () => {
        const {photos, selectedPhotos} = this.props;
        const {filter} = this.state;
        return filter === SHOW_SELECTED ? selectedPhotos : photos;
    };

    render() {
        return (
            <React.Fragment>
                <Filter
                    filter={this.state.filter}
                    onFilterChange={this.handleFilterChange}
                />
                <PhotoList
                    {...this.props}
                    photos={this.filterPhotos()}
                />
            </React.Fragment>
        );
    }
}