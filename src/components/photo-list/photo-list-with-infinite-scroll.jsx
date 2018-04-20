import React, {PureComponent} from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';
import {fetchPhotos} from 'api';
import {PhotoListWithFilter} from './photo-list-with-filter';

@plainBlock('infinite-scroll')
export class PhotoListWithInfiniteScroll extends PureComponent {
    state = {
        nextFrom: 0,
        photos: [],
        loading: false
    };

    observer;
    rootElement;
    bottomElement;

    componentDidMount = () => {
        this.observer = new IntersectionObserver(this.handleListEndIntersection, {
            rootMargin: '0px',
            threshold: 1.0
        });
        this.observer.observe(this.bottomElement);
        this.fetchData(this.props.config);
    };

    componentWillReceiveProps = ({startFrom, config}) => {
        if ((startFrom !== this.props.startFrom) || (config !== this.props.config)) {
            this.fetchData(config);
        }
    };

    componentWillUnmount = () => {
        this.observer.unobserve(this.bottomElement);
    };

    handleListEndIntersection = (entries) => {
        const ratio = entries[0].intersectionRatio;
        if ((ratio !== 1) || this.state.loading) {
            return;
        }
        this.fetchData(this.props.config);
    };

    fetchData = (config) => {
        if (!config || !this.props.loadingEnabled) {
            return;
        }
        const {chatId, pageSize} = config;
        if (!chatId) {
            return;
        }

        this.setState({loading: true});
        fetchPhotos(chatId, this.state.nextFrom, pageSize).then(res => {
            const newPhotos = res.items.map(item => item.attachment.photo);
            this.setState(({photos}) => ({
                photos: [...photos, ...newPhotos],
                loading: false,
                nextFrom: res.next_from
            }));
        });
    };

    render() {
        return (
            <div
                className={this.props.className}
                ref={(el) => {this.rootElement = el;}}
            >
                <PhotoListWithFilter
                    {...this.props}
                    photos={this.state.photos}
                />
                {this.state.loading && <LoadingMessage />}
                <div
                    ref={(el) => {this.bottomElement = el;}}
                    style={{height: '10px'}}
                />
            </div>
        )
    }
}

const LoadingMessage = PhotoListWithInfiniteScroll.element('message')(({className}) => (
    <div className={className}>
        Loading...
    </div>
));