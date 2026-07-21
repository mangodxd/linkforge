"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-destructive/50 p-8">
            <div className="text-center">
              <p className="text-sm font-medium text-destructive">Something went wrong</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="mt-2 text-xs text-muted-foreground underline"
              >
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
