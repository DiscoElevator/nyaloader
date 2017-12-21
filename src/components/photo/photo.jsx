import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import styles from './photo.scss';

export const Photo = plainBlock('photo', {styles})(({className, photo}) => (
    <div className={className}>
        <img src={photo.photo_130} alt="qqq" />
    </div>
));