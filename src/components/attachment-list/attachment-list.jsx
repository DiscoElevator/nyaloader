import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {Image} from 'components/image';
import styles from './attachment-list.scss';

export const AttachmentList = plainBlock('attachment-list', {styles})(({className, images}) => (
    <div className={className}>
        {images && images.map(item => <Image image={item} />)}
    </div>
));