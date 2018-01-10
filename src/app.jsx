import React from 'react';
import {Header} from 'components/header';
import {PhotoList} from 'components/photo-list';
import {withConfig} from 'modules/config';

export const App = withConfig((props) => (
    <div>
        <Header {...props} />
        <PhotoList {...props} />
    </div>
));