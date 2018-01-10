import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import styles from './photo.scss';

export const Photo = plainBlock('photo', ({selected}) => ({selected}), {styles})(({className, photo, onClick}) => (
    <div className={className} onClick={() => onClick(photo)}>
        <img src={photo.photo_130} alt="qqq" />
    </div>
));