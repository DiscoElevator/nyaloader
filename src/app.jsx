import React from 'react';
import {Header} from 'components/header';
import {PhotoList} from 'components/photo-list';
import {createConfigHOC} from 'modules/config';

export const App = createConfigHOC((props) => (
    <div>
        <Header {...props} />
        <PhotoList {...props} />
    </div>
));