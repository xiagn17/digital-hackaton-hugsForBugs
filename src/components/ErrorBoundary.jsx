import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo,
        });
    }

    render() {
        const { errorInfo, error } = this.state;
        const { children } = this.props;

        if (errorInfo) {
            console.error(error);
            console.error(errorInfo.componentStack);
            return (
                <div style={{ height: '80vh' }}>
                    <h2>Something went wrong.</h2>
                </div>
            );
        }
        return children;
    }
}
