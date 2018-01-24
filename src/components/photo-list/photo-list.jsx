import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {Photo} from 'components/photo';
import styles from './photo-list.scss';

const COLUMN_COUNT = 5;

export const PhotoList = plainBlock('photo-list', {styles})(({className, photos, selectedPhotos, onPhotoClick}) => (
    <div className={className}>
        {photos && photos.map(photo => (
            <PhotoListItem
                key={photo.id}
                photo={photo}
                selected={selectedPhotos.findIndex(item => item.id === photo.id) > -1}
                columns={calculateColumns(photo)}
                onPhotoClick={onPhotoClick}
            />
        ))}
    </div>
));

const PhotoListItem = PhotoList.element('item')(({className, columns, photo, selected, onPhotoClick}) => (
    <div className={className} style={{width: `${100 / COLUMN_COUNT * columns}%`}}>
        <Photo
            key={photo.id}
            photo={photo}
            selected={selected}
            onClick={onPhotoClick}
            columns={calculateColumns(photo)}
        />
    </div>
));

const calculateColumns = ({width, height}) => width > height ? 2 : 1;