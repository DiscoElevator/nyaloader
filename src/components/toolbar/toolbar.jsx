import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {Progressbar} from 'components/progressbar';
import {SHOW_ALL, SHOW_SELECTED} from 'constants/filters';


import styles from './toolbar.scss';

@plainBlock('toolbar', {styles})
export class Toolbar extends React.Component {
    static defaultProps = {
        filter: SHOW_ALL,
        selectedCount: 0
    };

    handleChange = e => this.props.onFilterChange(e.target.value);

    render() {
        return (
            <div className={this.props.className}>
                <label>
                    <input
                        type="radio"
                        value={SHOW_ALL}
                        checked={this.props.filter === SHOW_ALL}
                        disabled={this.props.loading}
                        onChange={this.handleChange}
                    />
                    Show all
                </label>
                <label>
                    <input
                        type="radio"
                        value={SHOW_SELECTED}
                        checked={this.props.filter === SHOW_SELECTED}
                        disabled={this.props.loading}
                        onChange={this.handleChange}
                    />
                    Show selected ({this.props.selectedCount})
                </label>
                <button
                    onClick={this.props.onDownloadButtonClick}
                    disabled={this.props.loading || this.props.downloadButtonDisabled}
                >
                    Download
                </button>
                {this.props.loading && <Progressbar
                    max={this.props.selectedCount}
                    progress={this.props.progress}
                />}
            </div>
        );
    }
}