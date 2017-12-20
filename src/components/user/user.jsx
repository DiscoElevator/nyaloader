import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';

export const User = plainBlock('user-info')(({className, user}) => (
    <div className={className}>
        {user && `${user.firstName} ${user.lastName}`}
    </div>
));