import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import styles from './image.scss';

export const Image = plainBlock('image', {styles})(({className, image}) => (
    <div className={className}>
        <img src={image.photo_130} alt="qqq" />
    </div>
));