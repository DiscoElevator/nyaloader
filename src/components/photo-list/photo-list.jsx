import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {Photo} from 'components/photo';
import styles from './photo-list.scss';

export const PhotoList = plainBlock('photo-list', {styles})(({className, photos, selectedPhotos, onPhotoClick}) => (
    <div className={className}>
        {photos && photos.map(photo => (
            <Photo
                key={photo.id}
                photo={photo}
                selected={selectedPhotos.findIndex(item => item.id === photo.id) > -1}
                onClick={onPhotoClick}
            />
        ))}
    </div>
));