import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	ToggleControl,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const {
			operatorsToDisplay,
			operators_to_display,
			title,
			centerLat,
			centerLng,
			zoom,
		} = attributes;

		const activeOperators = ( operatorsToDisplay && operatorsToDisplay.length > 0 )
			? operatorsToDisplay
			: ( operators_to_display && operators_to_display.length > 0 ? operators_to_display : [] );

		const blockProps = useBlockProps( {
			className: 'content-operators-map',
		} );

		// Query available published operators from WordPress core store
		const operators = useSelect( ( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'operator', {
				per_page: 50,
				status: 'publish',
				_fields: 'id,title,meta',
			} );
		}, [] );

		const handleToggleOperator = ( opId ) => {
			const idStr = String( opId );
			let updated = [ ...activeOperators.map( String ) ];
			if ( updated.includes( idStr ) ) {
				updated = updated.filter( ( id ) => id !== idStr );
			} else {
				updated.push( idStr );
			}
			setAttributes( {
				operatorsToDisplay: updated,
				operators_to_display: updated,
			} );
		};

		const handleSelectAll = () => {
			if ( operators && operators.length > 0 ) {
				const allIds = operators.map( ( op ) => String( op.id ) );
				setAttributes( {
					operatorsToDisplay: allIds,
					operators_to_display: allIds,
				} );
			}
		};

		const handleClearAll = () => {
			setAttributes( {
				operatorsToDisplay: [],
				operators_to_display: [],
			} );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="Operator Map Settings" initialOpen={ true }>
						<TextControl
							label="Sidebar Section Title"
							value={ title || 'Operators' }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<TextControl
							label="Default Latitude"
							value={ String( centerLat ?? 49.88531957670153 ) }
							onChange={ ( value ) => setAttributes( { centerLat: parseFloat( value ) || 49.88531957670153 } ) }
						/>
						<TextControl
							label="Default Longitude"
							value={ String( centerLng ?? -97.17762828465725 ) }
							onChange={ ( value ) => setAttributes( { centerLng: parseFloat( value ) || -97.17762828465725 } ) }
						/>
						<RangeControl
							label="Default Zoom Level"
							value={ zoom ?? 10 }
							onChange={ ( value ) => setAttributes( { zoom: value } ) }
							min={ 4 }
							max={ 18 }
						/>
					</PanelBody>

					<PanelBody title="Operators Selection" initialOpen={ true }>
						<p style={ { fontSize: '13px', color: '#637381', margin: '0 0 12px' } }>
							{ activeOperators.length === 0
								? 'Showing ALL published operators with coordinates (default).'
								: `Showing ${ activeOperators.length } selected operator(s).` }
						</p>

						<div style={ { display: 'flex', gap: '8px', marginBottom: '16px' } }>
							<button
								type="button"
								className="button button-small"
								onClick={ handleSelectAll }
							>
								Select All
							</button>
							<button
								type="button"
								className="button button-small"
								onClick={ handleClearAll }
							>
								Reset to All
							</button>
						</div>

						{ ! operators ? (
							<Spinner />
						) : (
							<div style={ { maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', padding: '8px', borderRadius: '4px' } }>
								{ operators.map( ( op ) => {
									const isChecked = activeOperators.map( String ).includes( String( op.id ) );
									return (
										<ToggleControl
											key={ op.id }
											label={ op.title?.rendered || `Operator #${ op.id }` }
											checked={ isChecked }
											onChange={ () => handleToggleOperator( op.id ) }
										/>
									);
								} ) }
							</div>
						) }
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="content-operators-map-tabs-container" style={ { backgroundColor: '#605e43', minHeight: '400px' } }>
						<h3 className="content-operators-map-title" style={ { color: '#ffffff', borderBottom: '1px solid #e0ac0f', margin: 0, padding: '20px' } }>
							{ title || 'Operators' }
						</h3>
						<ul className="content-operators-map-tabs-list" style={ { listStyle: 'none', padding: 0, margin: 0 } }>
							{ operators && operators.length > 0 ? (
								operators
									.filter( ( op ) => activeOperators.length === 0 || activeOperators.map( String ).includes( String( op.id ) ) )
									.slice( 0, 6 )
									.map( ( op, i ) => (
										<li
											key={ op.id }
											className={ `content-operators-map-tabs-list-items operator-tab ${ i === 0 ? 'active-tab' : '' }` }
											style={ { border: '1px solid #e0ac0f', padding: '15px', color: '#ffffff', backgroundColor: i === 0 ? 'rgba(224,172,15,0.1)' : 'transparent' } }
										>
											<div style={ { fontWeight: '700', fontSize: '1.1rem' } }>
												{ op.title?.rendered || `Operator #${ op.id }` }
											</div>
											<div style={ { fontSize: '0.9rem', color: '#e0ac0f', marginTop: '4px' } }>
												Indigenous Tourism Experience
											</div>
										</li>
									) )
							) : (
								<li style={ { padding: '20px', color: '#ffffff' } }>Loading operators...</li>
							) }
						</ul>
					</div>

					<div style={ { backgroundColor: '#e9ecef', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#495057', padding: '40px' } }>
						<div style={ { fontSize: '48px', marginBottom: '12px' } }>🗺️</div>
						<div style={ { fontSize: '1.25rem', fontWeight: '700', marginBottom: '8px' } }>
							Leaflet Interactive Map
						</div>
						<p style={ { margin: 0, textAlign: 'center', maxWidth: '400px', color: '#6c757d', fontSize: '0.95rem' } }>
							Interactive Leaflet map with custom hoop markers and zoom controls renders dynamically on the front end.
						</p>
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return null; // Server-side rendered via operator_block.php
	},
} );
