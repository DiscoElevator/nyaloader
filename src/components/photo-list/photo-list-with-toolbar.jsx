import React from 'react';
import {PhotoList} from './photo-list';
import {SHOW_ALL, SHOW_SELECTED} from 'constants/filters';
import {Toolbar} from 'components/toolbar';
import {DOWNLOAD_START} from 'constants/events';

const {ipcRenderer} = window.require('electron');

export class PhotoListWithToolbar extends React.Component {
    state = {
        filter: SHOW_ALL
    };

    handleFilterChange = filter => this.setState({filter});

    filterPhotos = () => {
        const {photos, selectedPhotos} = this.props;
        const {filter} = this.state;
        return filter === SHOW_SELECTED ? selectedPhotos : photos;
    };

    handleDownloadButtonClick = () => {
        ipcRenderer.send(DOWNLOAD_START, this.props.selectedPhotos);
    };

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    filter={this.state.filter}
                    onFilterChange={this.handleFilterChange}
                    selectedCount={this.props.selectedPhotos.length}
                    onDownloadButtonClick={this.handleDownloadButtonClick}
                />
                <PhotoList
                    {...this.props}
                    photos={this.filterPhotos()}
                />
            </React.Fragment>
        );
    }
}