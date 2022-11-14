/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig

toastr.options = {
  "preventDuplicates": true,
  "preventOpenDuplicates": true
  };
  
  toastr.error("Your Message","Your Title",{timeOut: 5000});