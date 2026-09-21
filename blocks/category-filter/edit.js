import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes } ) {
		return (
			<div className="itm-category-filter-editor-wrap">
				<ServerSideRender
					block={ metadata.name }
					attributes={ attributes }
				/>
			</div>
		);
	},
	save() {
		return null;
	},
} );
