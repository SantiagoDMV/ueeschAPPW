/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'ueesch.eduinclusivaec.com','res.cloudinary.com','https://ueesch-5h2a.onrender.com', "https://eduinclusivaec.com/"],
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

};

module.exports = nextConfig;
