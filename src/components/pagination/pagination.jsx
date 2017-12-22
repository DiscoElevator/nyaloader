import React from 'react';
import {plainBlock} from '@redneckz/react-bem-helper';

export const pagination = (WrappedComponent) => {
    return plainBlock('pagination')(class PaginationWrapper extends React.Component {
        state = {
            startFrom: null,
            nextPage: null,
            pages: [],
            loading: false
        };

        handleLoadStart = () => this.setState({loading: true});

        handleLoadEnd = (nextFrom) => {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    nextPage: nextFrom,
                    loading: false
                };
            })
        };

        handleNextPage = () => this.setState(prevState => ({
            ...prevState,
            startFrom: prevState.nextPage,
            pages: prevState.nextPage ? [...prevState.pages, prevState.nextPage] : prevState.pages
        }));

        handlePreviousPage = () => this.setState(prevState => {
            const pages = prevState.pages.slice(0, prevState.pages.length - 1);
            const prevPage = pages.length ? pages[pages.length - 1] : null;
            return {
                ...prevState,
                startFrom: prevPage,
                pages
            };
        });

        render() {
            const {
                className,
                ...otherProps
            } = this.props;
            return (
                <div className={className}>
                    <WrappedComponent
                        startFrom={this.state.startFrom}
                        onLoadEnd={this.handleLoadEnd}
                        onLoadStart={this.handleLoadStart}
                        {...otherProps}
                    />
                    <PaginationControls
                        onNext={this.handleNextPage}
                        onPrevious={this.handlePreviousPage}
                        loading={this.state.loading}
                        canGoBack={this.state.pages.length > 0}
                    />
                </div>
            );
        }
    });
};

const PaginationControls = plainBlock('pagination-controls')(({className, onPrevious, onNext, loading, canGoBack}) => (
    <div className={className}>
        <button onClick={onPrevious} disabled={loading || !canGoBack}>Back</button>
        <button onClick={onNext} disabled={loading}>Next</button>
    </div>
));