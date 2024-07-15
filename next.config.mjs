/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        // {
        //   protocol: 'https',
        //   hostname: 'clusterprotocol.ai',
        //   port: '',
        //   pathname: '/assets/**',
        // },
        // {
        //   protocol: 'https',
        //   hostname: 'cdn.dribbble.com',
        //   port: '',
        //   pathname: '/**',
        // },
        // {
        //   protocol: 'https',
        //   hostname: 'gravatar.com',
        //   port: '',
        //   pathname: '/**',
        // },
        // {
        //   protocol: 'https',
        //   hostname: '*.unsplash.com',
        //   port: '',
        //   pathname: '/**',
        // },
        {
          protocol: 'https',
          hostname: '*.*.*',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: '*.*.*',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: '*.*',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: '*.*',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  