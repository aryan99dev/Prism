import React, { type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // You can also log the error to an error reporting service
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h1 className="text-lg font-medium text-red-800">Something went wrong.</h1>
                    {this.state.error && (
                        <p className="mt-2 text-sm text-red-600">{this.state.error.message}</p>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
