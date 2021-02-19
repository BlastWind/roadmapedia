/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    // directory name: 'build directory'
    public: "/", // take whatever is in public and builds it into root
    src: '/dist',// take whatever is in /src and builds it into /dist 
    d3: "/d3"
  },
  plugins: ["@snowpack/plugin-babel", '@snowpack/plugin-sass', "@snowpack/plugin-webpack"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    baseUrl: "./"
  },
};
