import NextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer =NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
