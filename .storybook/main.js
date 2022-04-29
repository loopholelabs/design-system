module.exports = {
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',

		// SCSS Modules
		// {
		// 	test: /\.scss$/ui,
		// 	use: [
		// 		{ loader: 'style-loader' },
		// 		{
		// 			loader: 'css-loader',
		// 			options: {
		// 				modules: true,
		// 				localIdentName: '[name]__[local]--[hash:base64:5]',
		// 			},
		// 		},
		// 		{ loader: 'resolve-url-loader' },
		// 		{ loader: 'sass-loader' },
		// 	],
		// },
		// {
		// 	name: `@storybook/preset-scss`,
		// 	options: {
		// 		rule: {
		// 			test: /\.module\.scss$/,
		// 		},
		// 		cssLoaderOptions: {
		// 			modules: true,
		// 			localIdentName: '[name]__[local]--[hash:base64:5]',
		// 		}
		// 	},
		// },
	],
	core: {
		builder: 'webpack5',
	},
	framework: '@storybook/react',
	stories: [
		'../src/components/**/*.stories.jsx',
	],
	webpackFinal: async config => {
		config.module.rules.push({
			test: /\.scss$/ui,
			use: [
				{ loader: 'style-loader' },
				{
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: '[name]__[local]--[hash:base64:5]',
						},
					},
				},
				{ loader: 'resolve-url-loader' },
				{ loader: 'sass-loader' },
			],
		})

		return config
	},
}
