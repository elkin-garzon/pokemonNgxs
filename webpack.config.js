const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
	name: 'pokemonNgxs',
	exposes: {
		'./routes': './src/app/app.routes',
		'./pokemon': './src/app/pages/home/home.component',
	},
	shared: {
		...shareAll({ singleton: true, strictVersion: false, requiredVersion: 'auto' }),
	},
});
