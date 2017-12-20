import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {Image} from 'components/image';
import styles from './attachment-list.scss';

export const AttachmentList = plainBlock('attachment-list', {styles})(({className}) => (
    <div className={className}>
        <Image />
        <Image />
        <Image />
    </div>
));