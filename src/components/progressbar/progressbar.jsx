import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import styles from './progressbar.scss';

export const Progressbar = plainBlock('progressbar', {styles})(({className, max = 0, progress = 0}) => (
    <div className={className}>
        <progress max={max} value={progress} />
        <ProgressInfo max={max} progress={progress} />
    </div>
));

const ProgressInfo = Progressbar.element('info')(({className, max, progress}) => (
    <div className={className}>
        {`${progress}/${max}`}
    </div>
));