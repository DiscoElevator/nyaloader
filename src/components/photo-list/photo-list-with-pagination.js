import {pagination} from 'modules/pagination';
import {PhotoListWithData} from './photo-list-with-data';

export const PhotoListWithPagination = pagination(PhotoListWithData);