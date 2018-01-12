import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
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
                    onChange={this.handleChange}
                />
                    Show all
                </label>
                <label>
                <input
                    type="radio"
                    value={SHOW_SELECTED}
                    checked={this.props.filter === SHOW_SELECTED}
                    onChange={this.handleChange}
                />
                    Show selected ({this.props.selectedCount})
                </label>
                <button onClick={this.props.onDownloadButtonClick}>Download</button>
            </div>
        );
    }
}