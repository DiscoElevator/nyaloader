import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {User} from 'components/user';
import styles from './header.scss';

export const Header = plainBlock('header', {styles})(({className, user}) => (
    <div className={className}>
        <UserInfo user={user} />
    </div>
));

const UserInfo = Header.element('user-info')(({className, user}) => (
    <div className={className}>
        <User user={user} />
    </div>
));