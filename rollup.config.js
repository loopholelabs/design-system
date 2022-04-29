import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import sass from 'rollup-plugin-sass'

import packageJson from './package.json'

const config = {
	input: './src/index.js',
	output: [
		{
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: packageJson.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal(),
		resolve(),
		commonjs(),
		json(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules',
			presets: [
				'@babel/preset-env',
				'@babel/preset-react',
			],
			plugins: [
				['@babel/plugin-transform-react-jsx', {
					runtime: 'automatic',
				}],
			],
		}),
		sass(),
	],
}

export default config
