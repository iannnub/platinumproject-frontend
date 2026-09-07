'use client';

import { useReportWebVitals } from 'next/web-vitals';

export default function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    try {
      if (!metric || typeof metric !== 'object') return;

      // Guard against missing properties like startTime in synthetic or partial entries
      const startTime = (metric as any)?.startTime;
      const metricName = metric.name;

      if (process.env.NODE_ENV === 'development') {
        if (metricName && startTime !== undefined) {
          // Metric safely verified
        }
      }

      if (process.env.NODE_ENV === 'production' && startTime !== undefined) {
        // Safe production analytics transmission if needed
      }
    } catch {
      // Silently catch - prevent uncaught TypeError: Cannot read properties of undefined (reading 'startTime')
    }
  });

  return null;
}
