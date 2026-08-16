import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	RangeControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const {
			title,
			subtitle,
			showViewAll,
			viewAllText,
			viewAllUrl,
			selectionMode,
			selectedTaxonomy,
			selectedTermSlug,
			manualOperatorIds,
			numberOfPosts,
			orderBy,
			order,
			columns,
			backgroundColor,
		} = attributes;

		const blockProps = useBlockProps( {
			className: `featured-operators-block alignfull bg-${ backgroundColor || 'off-white' }`,
		} );

		// Sample operator cards for live editor preview
		const previewCards = Array.from( { length: Math.min( numberOfPosts || 4, columns || 4 ) } ).map( ( _, i ) => (
			<div key={ i } className="featured-operator-card-preview" style={ {
				backgroundColor: '#ffffff',
				borderRadius: '16px',
				overflow: 'hidden',
				boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
				border: '1px solid #eef0f2',
			} }>
				<div style={ {
					height: '180px',
					backgroundColor: '#e2e8f0',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: '#64748b',
					fontWeight: '600',
				} }>
					Operator Photo { i + 1 }
				</div>
				<div style={ { padding: '20px' } }>
					<span style={ {
						display: 'inline-block',
						color: '#da5225',
						fontWeight: '700',
						fontSize: '0.85rem',
						textTransform: 'uppercase',
						letterSpacing: '0.05em',
						marginBottom: '6px',
					} }>
						{ selectedTermSlug || ( i % 2 === 0 ? 'Central Region' : 'Northern Region' ) }
					</span>
					<h4 style={ {
						margin: '0 0 8px',
						fontSize: '1.2rem',
						fontWeight: '700',
						color: '#212b36',
					} }>
						Sample Operator { i + 1 }
					</h4>
					<p style={ {
						margin: 0,
						fontSize: '0.9rem',
						color: '#637381',
						lineHeight: '1.4',
					} }>
						Authentic Indigenous tourism experience in Manitoba...
					</p>
				</div>
			</div>
		) );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="Header Settings" initialOpen={ true }>
						<TextControl
							label="Section Title"
							value={ title || '' }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<TextareaControl
							label="Section Subtitle (Optional)"
							value={ subtitle || '' }
							onChange={ ( value ) => setAttributes( { subtitle: value } ) }
						/>
						<ToggleControl
							label="Show 'View All' Link"
							checked={ showViewAll ?? true }
							onChange={ ( value ) => setAttributes( { showViewAll: value } ) }
						/>
						{ showViewAll && (
							<Fragment>
								<TextControl
									label="Link Text"
									value={ viewAllText || 'View All' }
									onChange={ ( value ) => setAttributes( { viewAllText: value } ) }
								/>
								<TextControl
									label="Link URL"
									value={ viewAllUrl || '/operators/' }
									onChange={ ( value ) => setAttributes( { viewAllUrl: value } ) }
								/>
							</Fragment>
						) }
					</PanelBody>

					<PanelBody title="Operator Selection" initialOpen={ true }>
						<SelectControl
							label="Selection Mode"
							value={ selectionMode || 'taxonomy' }
							options={ [
								{ label: 'Filter by Taxonomy / Query', value: 'taxonomy' },
								{ label: 'Manually Select Specific Operators', value: 'manual' },
							] }
							onChange={ ( value ) => setAttributes( { selectionMode: value } ) }
						/>

						{ selectionMode === 'manual' ? (
							<TextControl
								label="Operator Post IDs (comma-separated)"
								help="Enter post IDs e.g. 307, 305, 303, 301"
								value={ ( manualOperatorIds || [] ).join( ', ' ) }
								onChange={ ( value ) => {
									const ids = value
										.split( ',' )
										.map( ( s ) => parseInt( s.trim(), 10 ) )
										.filter( ( n ) => ! isNaN( n ) );
									setAttributes( { manualOperatorIds: ids } );
								} }
							/>
						) : (
							<Fragment>
								<SelectControl
									label="Filter By Taxonomy"
									value={ selectedTaxonomy || 'all' }
									options={ [
										{ label: 'All Operators (No filter)', value: 'all' },
										{ label: 'Region (operator_region)', value: 'operator_region' },
										{ label: 'Category (operator_category)', value: 'operator_category' },
									] }
									onChange={ ( value ) => setAttributes( { selectedTaxonomy: value } ) }
								/>
								{ selectedTaxonomy !== 'all' && (
									<TextControl
										label="Term Slug (e.g. northern, central, culinary, powwow)"
										value={ selectedTermSlug || '' }
										onChange={ ( value ) => setAttributes( { selectedTermSlug: value } ) }
									/>
								) }
								<RangeControl
									label="Number of Operators to Display"
									value={ numberOfPosts ?? 4 }
									onChange={ ( value ) => setAttributes( { numberOfPosts: value } ) }
									min={ 1 }
									max={ 12 }
								/>
								<SelectControl
									label="Order By"
									value={ orderBy || 'rand' }
									options={ [
										{ label: 'Random (Fresh on each visit)', value: 'rand' },
										{ label: 'Operator Title (Alphabetical)', value: 'title' },
										{ label: 'Date Added (Recent first)', value: 'date' },
									] }
									onChange={ ( value ) => setAttributes( { orderBy: value } ) }
								/>
								{ orderBy !== 'rand' && (
									<SelectControl
										label="Sort Direction"
										value={ order || 'ASC' }
										options={ [
											{ label: 'Ascending (A-Z / Oldest)', value: 'ASC' },
											{ label: 'Descending (Z-A / Newest)', value: 'DESC' },
										] }
										onChange={ ( value ) => setAttributes( { order: value } ) }
									/>
								) }
							</Fragment>
						) }
					</PanelBody>

					<PanelBody title="Layout & Style" initialOpen={ false }>
						<SelectControl
							label="Background Color"
							value={ backgroundColor || 'off-white' }
							options={ [
								{ label: 'Off-White (#f9f9f9)', value: 'off-white' },
								{ label: 'White (#ffffff)', value: 'white' },
							] }
							onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
						/>
						<RangeControl
							label="Grid Columns (Desktop)"
							value={ columns ?? 4 }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ 4 }
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="featured-operators-container" style={ {
						maxWidth: '1244px',
						margin: '0 auto',
						padding: '60px 24px',
					} }>
						<div className="featured-operators-header" style={ {
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'baseline',
							marginBottom: '32px',
							borderBottom: '2px solid rgba(0,0,0,0.06)',
							paddingBottom: '16px',
						} }>
							<div>
								<h2 style={ {
									margin: '0 0 6px',
									fontSize: '2.2rem',
									fontWeight: '700',
									color: '#212b36',
								} }>
									{ title || 'Featured Operators' }
								</h2>
								{ subtitle && (
									<p style={ { margin: 0, color: '#637381', fontSize: '1.1rem' } }>
										{ subtitle }
									</p>
								) }
							</div>
							{ showViewAll && (
								<div style={ {
									color: '#610000',
									fontWeight: '700',
									fontSize: '1.05rem',
									display: 'flex',
									alignItems: 'center',
									gap: '6px',
								} }>
									<span>{ viewAllText || 'View All' }</span>
									<span style={ { fontSize: '1.2em' } }>›</span>
								</div>
							) }
						</div>

						<div className={ `featured-operators-grid grid-cols-${ columns || 4 }` } style={ {
							display: 'grid',
							gridTemplateColumns: `repeat(${ columns || 4 }, 1fr)`,
							gap: '24px',
						} }>
							{ previewCards }
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return null; // Server-side rendered via featured_operators_block.php
	},
} );
