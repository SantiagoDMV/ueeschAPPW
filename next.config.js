/** @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
*/


module.exports = {
  images: {
    domains: ['drive.google.com'],
  },
}

// module.exports={
//   images:{
//     domains:['drive.google.com','https://drive.google.com/drive/folders/1mmqKOpRz9fn_xvh2mPWRXDOfYkhV1NmY','scontent.fatf2-1.fna.fbcdn.net'],
//     //desabilitar esto despues => uniptimizes
//   },
// }

//import { createProxyMiddleware } from "http-proxy-middleware";
/*
module.exports = {
  images: {
    domains: [
      'drive.google.com',
      'https://drive.google.com/drive/folders/1mmqKOpRz9fn_xvh2mPWRXDOfYkhV1NmY',
      'scontent.fatf2-1.fna.fbcdn.net'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/webservice/:path*',
        destination: 'http://localhost/webservice/:path*', // URL de la API de Moodle (ajusta el puerto si es diferente)
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/webservice/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'http://localhost:3000', // Origen permitido (puerto de tu frontend)
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS, PUT, DELETE',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};*/

