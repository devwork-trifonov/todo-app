const mix = require("laravel-mix")
const MomentLocalesPlugin = require("moment-locales-webpack-plugin")
const path = require("path")
// require("laravel-mix-bundle-analyzer");
// if (!mix.inProduction()) {
// 	mix.bundleAnalyzer();
// }

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: ["ru"],
    }),
  ],
})

mix.react("resources/js/index.js", "public/js")
mix.sass("resources/sass/app.scss", "public/css")
mix.sass(
  path.resolve(__dirname, "node_modules", "swiper/swiper.scss"),
  "public/css"
)
mix.sass(
  path.resolve(
    __dirname,
    "node_modules",
    "swiper/components/pagination/pagination.scss"
  ),
  "public/css"
)
mix.sass(
  path.resolve(
    __dirname,
    "node_modules",
    "swiper/components/navigation/navigation.scss"
  ),
  "public/css"
)
