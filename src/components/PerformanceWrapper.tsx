/**
 * Performance Wrapper Component
 * Automatically monitors component performance and provides optimization hints
 */

import React, { Component } from 'react';
import { PERFORMANCE_CONFIG, PERFORMANCE_THRESHOLDS } from '@/config/performance';

interface PerformanceWrapperProps {
  children: React.ReactNode;
  componentName: string;
  enableErrorBoundary?: boolean;
}

interface PerformanceWrapperState {
  hasError: boolean;
  errorInfo?: string;
}

/**
 * Enhanced Error Boundary with Performance Monitoring
 */
export class PerformanceWrapper extends Component<PerformanceWrapperProps, PerformanceWrapperState> {
  private renderCount = 0;
  private mountTime = 0;

  constructor(props: PerformanceWrapperProps) {
    super(props);
    this.state = { hasError: false };
    this.mountTime = performance.now();
  }

  static getDerivedStateFromError(error: Error): PerformanceWrapperState {
    return {
      hasError: true,
      errorInfo: error.message
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const { componentName } = this.props;
    
    if (PERFORMANCE_CONFIG.ENABLE_PERFORMANCE_LOGS) {
      console.error(`Error in ${componentName}:`, error, errorInfo);
    }
    
    // Report to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  componentDidMount() {
    if (PERFORMANCE_CONFIG.ENABLE_DEV_MONITORING) {
      const mountTime = performance.now() - this.mountTime;
      if (mountTime > PERFORMANCE_THRESHOLDS.SLOW_RENDER_WARNING) {
        console.warn(`${this.props.componentName} slow mount: ${mountTime.toFixed(2)}ms`);
      }
    }
  }

  private logPerformance() {
    this.renderCount++;

    if (!PERFORMANCE_CONFIG.ENABLE_DEV_MONITORING) return;

    const renderTime = performance.now() - this.mountTime;
    
    // Log slow renders
    if (renderTime > PERFORMANCE_THRESHOLDS.SLOW_RENDER_WARNING) {
      console.warn(`Slow render in ${this.props.componentName}:`, {
        renderTime: `${renderTime.toFixed(2)}ms`,
        renderCount: this.renderCount,
        suggestions: [
          'Consider memoizing the component',
          'Check for unnecessary re-renders',
          'Optimize expensive computations'
        ]
      });
    }
  }

  render() {
    const { children, componentName, enableErrorBoundary = true } = this.props;
    const { hasError, errorInfo } = this.state;

    // Log performance on render
    this.logPerformance();

    if (enableErrorBoundary && hasError) {
      return (
        <div className="error-boundary p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong in {componentName}
          </h2>
          {errorInfo && (
            <p className="text-sm text-red-600 mb-4">{errorInfo}</p>
          )}
          <button
            onClick={() => this.setState({ hasError: false, errorInfo: undefined })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }

    return <>{children}</>;
  }
}

/**
 * HOC for automatic performance wrapping
 */
export function withPerformanceWrapper<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: {
    componentName?: string;
    enableErrorBoundary?: boolean;
  } = {}
) {
  const {
    componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component',
    enableErrorBoundary = true
  } = options;

  const WithPerformanceWrapper = (props: P) => (
    <PerformanceWrapper
      componentName={componentName}
      enableErrorBoundary={enableErrorBoundary}
    >
      <WrappedComponent {...props} />
    </PerformanceWrapper>
  );

  WithPerformanceWrapper.displayName = `withPerformanceWrapper(${componentName})`;

  return WithPerformanceWrapper;
}

/**
 * React Hook for performance monitoring
 */
export function usePerformanceMetrics(componentName: string) {
  const [metrics, setMetrics] = React.useState({
    renderCount: 0,
    avgRenderTime: 0,
    lastRenderTime: 0
  });

  const startTime = React.useRef<number>(0);

  const startMeasurement = React.useCallback(() => {
    startTime.current = performance.now();
  }, []);

  const endMeasurement = React.useCallback(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    setMetrics(prev => ({
      renderCount: prev.renderCount + 1,
      avgRenderTime: (prev.avgRenderTime * prev.renderCount + renderTime) / (prev.renderCount + 1),
      lastRenderTime: renderTime
    }));

    if (PERFORMANCE_CONFIG.ENABLE_PERFORMANCE_LOGS && renderTime > PERFORMANCE_THRESHOLDS.SLOW_RENDER_WARNING) {
      console.warn(`${componentName} render: ${renderTime.toFixed(2)}ms`);
    }
  }, [componentName]);

  React.useEffect(() => {
    startMeasurement();
    return endMeasurement;
  });

  return metrics;
}

export default PerformanceWrapper;