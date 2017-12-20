import React from 'react';
import {Header} from 'components/header';
import {AttachmentList} from './components/attachment-list';

import styles from './app.scss'; // eslint-disable-line no-unused-vars

export const App = () => (
    <div>
        <Header />
        <AttachmentList />
    </div>
);