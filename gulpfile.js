const elixir = require('laravel-elixir');

require('laravel-elixir-webpack-official');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

Elixir.webpack.mergeConfig({
    module : {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    }
});

elixir(mix => {
    mix.sass('app.scss')
        .webpack('app.js');
});
