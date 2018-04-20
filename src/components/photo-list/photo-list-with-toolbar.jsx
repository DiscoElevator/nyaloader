import React from 'react';
import {SHOW_ALL} from 'constants/filters';
import {Toolbar} from 'components/toolbar';
import {PhotoListWithInfiniteScroll} from './photo-list-with-infinite-scroll';
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
        progress: 0,
        selectedPhotos: []
    };

    handleFilterChange = filter => this.setState({filter});

    handleDownloadButtonClick = () => {
        ipcRenderer.on(DOWNLOAD_PROGRESS_UPDATE, this.updateProgress);
        ipcRenderer.send(DOWNLOAD_START, this.state.selectedPhotos);
        this.setState({loading: true, progress: 0});
        ipcRenderer.once(DOWNLOAD_FINISHED, () => {
            ipcRenderer.removeListener(DOWNLOAD_PROGRESS_UPDATE, this.updateProgress);
            this.setState({loading: false, progress: 0});
        });
    };

    togglePhotoSelection = (photo) => this.setState(({selectedPhotos}) => {
        const result = [...selectedPhotos];
        const index = selectedPhotos.findIndex(item => item.id === photo.id);
        if (index > -1) {
            result.splice(index, 1);
        } else {
            result.push(photo);
        }
        return {
            selectedPhotos: result
        }
    });

    updateProgress = (event, {progress}) => this.setState({progress});

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    filter={this.state.filter}
                    onFilterChange={this.handleFilterChange}
                    selectedCount={this.state.selectedPhotos.length}
                    onDownloadButtonClick={this.handleDownloadButtonClick}
                    loading={this.state.loading}
                    progress={this.state.progress}
                    downloadButtonDisabled={this.state.selectedPhotos.length === 0}
                />
                <PhotoListWithInfiniteScroll
                    {...this.props}
                    loadingEnabled={this.state.filter === SHOW_ALL}
                    filter={this.state.filter}
                    selectedPhotos={this.state.selectedPhotos}
                    onPhotoClick={this.togglePhotoSelection}
                />
            </React.Fragment>
        );
    }
}