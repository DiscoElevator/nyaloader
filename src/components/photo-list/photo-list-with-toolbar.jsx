import React from 'react';
import {PhotoList} from './photo-list';
import {SHOW_ALL, SHOW_SELECTED} from 'constants/filters';
import {Toolbar} from 'components/toolbar';
import {
    DOWNLOAD_START,
    DOWNLOAD_PROGRESS_UPDATE,
    DOWNLOAD_FINISHED
} from 'constants/events';

const {ipcRenderer} = window.require('electron');

export class PhotoListWithToolbar extends React.Component {
    state = {
        filter: SHOW_ALL,
        loading: false,
        progress: 0
    };

    handleFilterChange = filter => this.setState({filter});

    filterPhotos = () => {
        const {photos, selectedPhotos} = this.props;
        const {filter} = this.state;
        return filter === SHOW_SELECTED ? selectedPhotos : photos;
    };

    handleDownloadButtonClick = () => {
        ipcRenderer.on(DOWNLOAD_PROGRESS_UPDATE, this.updateProgress);
        ipcRenderer.send(DOWNLOAD_START, this.props.selectedPhotos);
        this.setState({loading: true, progress: 0});
        ipcRenderer.once(DOWNLOAD_FINISHED, () => {
            ipcRenderer.removeListener(DOWNLOAD_PROGRESS_UPDATE, this.updateProgress);
            this.setState({loading: false});
        });
    };

    updateProgress = (event, {progress}) => this.setState({progress});

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    filter={this.state.filter}
                    onFilterChange={this.handleFilterChange}
                    selectedCount={this.props.selectedPhotos.length}
                    onDownloadButtonClick={this.handleDownloadButtonClick}
                    loading={this.state.loading}
                    progress={this.state.progress}
                    downloadButtonDisabled={this.props.selectedPhotos.length === 0}
                />
                <PhotoList
                    {...this.props}
                    photos={this.filterPhotos()}
                />
            </React.Fragment>
        );
    }
}