const mix = require("laravel-mix");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
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
});

// mix.copy("resources/css/swiper.min.css", "public/css/swiper.min.css");
mix.react("resources/js/index.js", "public/js");
mix.sass("resources/sass/app.scss", "public/css");
// .sass("resources/sass/welcome.sass", "public/css");
