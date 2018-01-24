import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import styles from './photo.scss';

export const Photo = plainBlock('photo', ({selected}) => ({selected}), {styles})(({className, photo, onClick}) => (
    <div className={className} onClick={() => onClick(photo)}>
        <Image src={photo.photo_604} title={photo.id} />
    </div>
));

const Image = Photo.element('image')(({className, title, src}) => (
    <img className={className} src={src} alt={title} />
));