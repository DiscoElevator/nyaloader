import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import styles from './image.scss';

export const Image = plainBlock('image', {styles})(({className}) => (
    <div className={className}>
        image
    </div>
));