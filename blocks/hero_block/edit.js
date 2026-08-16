import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ColorPicker,
	RangeControl,
	ToggleControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import metadata from './block.json';

const HERO_TEMPLATE = [
	[
		'core/heading',
		{
			level: 1,
			textAlign: 'center',
			placeholder: 'Hero Title',
			textColor: 'white',
		},
	],
	[
		'core/paragraph',
		{
			align: 'center',
			placeholder: 'Optional subtitle or intro text...',
			textColor: 'white',
		},
	],
];

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const {
			backgroundImage,
			showHoopOverlay,
			overlayOpacity,
			overlayColor,
			minHeight,
			contentAlignment,
			verticalAlignment,
		} = attributes;

		const blockProps = useBlockProps( {
			className: `hero-block alignfull text-align-${ contentAlignment || 'center' } valign-${ verticalAlignment || 'middle' } ${ showHoopOverlay ? 'has-hoop-overlay' : '' }`,
			style: {
				backgroundImage: backgroundImage?.url ? `url(${ backgroundImage.url })` : 'none',
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
				minHeight: `${ minHeight ?? 60 }vh`,
				position: 'relative',
				display: 'flex',
				alignItems: verticalAlignment === 'top' ? 'flex-start' : ( verticalAlignment === 'bottom' ? 'flex-end' : 'center' ),
				justifyContent: contentAlignment === 'left' ? 'flex-start' : ( contentAlignment === 'right' ? 'flex-end' : 'center' ),
				width: '100%',
			},
		} );

		const overlayStyle = {
			position: 'absolute',
			inset: 0,
			backgroundColor: overlayColor || '#000000',
			opacity: ( overlayOpacity ?? 25 ) / 100,
			pointerEvents: 'none',
			zIndex: 1,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="Background Image" initialOpen={ true }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundImage: {
											id: media.id,
											url: media.url,
											alt: media.alt || '',
										},
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ backgroundImage?.id }
								render={ ( { open } ) => (
									<div>
										{ backgroundImage?.url && (
											<img
												src={ backgroundImage.url }
												alt={ backgroundImage.alt || '' }
												style={ { width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' } }
											/>
										) }
										<Button onClick={ open } variant="secondary">
											{ backgroundImage?.url ? 'Change Image' : 'Select Background Image' }
										</Button>
										{ backgroundImage?.url && (
											<Button
												onClick={ () => setAttributes( { backgroundImage: undefined } ) }
												variant="link"
												isDestructive
												style={ { marginLeft: '8px' } }
											>
												Remove
											</Button>
										) }
									</div>
								) }
							/>
						</MediaUploadCheck>
					</PanelBody>

					<PanelBody title="Brand Overlay" initialOpen={ true }>
						<ToggleControl
							label="Show Brand Hoop Overlay"
							help="Displays the decorative ITM brand hoop ring over the background photo."
							checked={ showHoopOverlay ?? true }
							onChange={ ( value ) => setAttributes( { showHoopOverlay: value } ) }
						/>
						<p style={ { marginBottom: '8px' } }><strong>Darkness Overlay Color</strong></p>
						<ColorPicker
							color={ overlayColor || '#000000' }
							onChange={ ( value ) => setAttributes( { overlayColor: value } ) }
							enableAlpha={ false }
						/>
						<RangeControl
							label="Overlay Opacity (%)"
							value={ overlayOpacity ?? 25 }
							onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody title="Layout & Alignment" initialOpen={ false }>
						<RangeControl
							label="Minimum Height (vh)"
							value={ minHeight ?? 60 }
							onChange={ ( value ) => setAttributes( { minHeight: value } ) }
							min={ 30 }
							max={ 100 }
						/>
						<SelectControl
							label="Content Alignment"
							value={ contentAlignment || 'center' }
							options={ [
								{ label: 'Centered', value: 'center' },
								{ label: 'Left Aligned', value: 'left' },
								{ label: 'Right Aligned', value: 'right' },
							] }
							onChange={ ( value ) => setAttributes( { contentAlignment: value } ) }
						/>
						<SelectControl
							label="Vertical Position"
							value={ verticalAlignment || 'middle' }
							options={ [
								{ label: 'Middle', value: 'middle' },
								{ label: 'Top', value: 'top' },
								{ label: 'Bottom', value: 'bottom' },
							] }
							onChange={ ( value ) => setAttributes( { verticalAlignment: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div style={ overlayStyle } />
					{ ( showHoopOverlay ?? true ) && (
						<div className="hero-block-hoop-overlay" aria-hidden="true">
							<div className="hero-hoop-graphic" />
						</div>
					) }
					<div className="hero-block-container" style={ { position: 'relative', zIndex: 2, width: '100%', maxWidth: '1200px', padding: '60px 20px' } }>
						<InnerBlocks template={ HERO_TEMPLATE } />
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return <InnerBlocks.Content />;
	},
} );
