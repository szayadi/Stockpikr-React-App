import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Component, ReactNode, useCallback, useState } from 'react';

export const useAsyncError = () => {
  const [, setError] = useState();
  return useCallback(
    (e: any) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class GlobalErrorBoundary extends Component<ErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }

  handleClose = () => {
    this.setState({ hasError: false, errorMessage: '' });
    history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Dialog open={this.state.hasError}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <p>
              Oops! Something went wrong.<br></br> <br></br> {this.state.errorMessage}
            </p>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={this.handleClose}>
              Go Back
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return this.props.children;
  }
}
export default GlobalErrorBoundary;
