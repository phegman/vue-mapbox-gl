const path = require('path');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var config = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = [
	merge(config, {
		entry: {
			app: './src/app.js',
		},
	}),
	merge(config, {
		entry: {
			Mapbox: './src/components/Mapbox.vue',
		},
		output: {
			filename: 'Mapbox.js',
			libraryTarget: 'umd',
			library: 'mapbox-gl-vue',
			umdNamedDefine: true
		},
	}),
];
