// Block editor JS build config.
// Extends @wordpress/scripts webpack config.
//
// Entries:
//   src/index.js           -> build/index.js     (shared utilities, always present)
//   blocks/{name}/edit.js  -> blocks/{name}/index.js  (per-block, auto-discovered)
//
// Adding a new block: create blocks/my-block/edit.js and it will be picked
// up automatically on the next build without touching this file.

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path          = require( 'path' );
const fs            = require( 'fs' );

const entry = {
	'build/index': path.resolve( __dirname, 'src/index.js' ),
};

const blocksDir = path.resolve( __dirname, 'blocks' );
fs.readdirSync( blocksDir ).forEach( function( name ) {
	var editFile = path.join( blocksDir, name, 'edit.js' );
	if ( fs.existsSync( editFile ) ) {
		entry[ 'blocks/' + name + '/index' ] = editFile;
	}
} );

module.exports = {
	...defaultConfig,

	entry: entry,

	output: {
		...defaultConfig.output,
		clean:    false,
		path:     path.resolve( __dirname ),
		filename: '[name].js',
	},
};
