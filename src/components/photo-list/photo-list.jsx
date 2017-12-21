import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {Photo} from 'components/photo';
import styles from './photo-list.scss';

export const PhotoList = plainBlock('photo-list', {styles})(({className, photos}) => (
    <div className={className}>
        {photos && photos.map(item => <Photo photo={item} />)}
    </div>
));