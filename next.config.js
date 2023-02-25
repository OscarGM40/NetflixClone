/** @type {import('next').NextConfig} */
module.exports = {
  // cada vez que React libere una version con posibles breaking changes esta propiedad ayuda a que no haya conflictos
  reactStrictMode: true,
  images:{
    domains:["image.tmdb.org"],   
  }
}
