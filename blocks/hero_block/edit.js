import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ColorPicker,
	RangeControl,
	Button,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import metadata from './block.json';

registerBlockType( metadata.name, {

	edit( { attributes, setAttributes } ) {
		const {
			backgroundImage,
			title,
			overlayOpacity,
			overlayColor,
			textColor,
			minHeight,
		} = attributes;

		// Canvas preview styles.
		const sectionStyle = {
			backgroundImage:    backgroundImage?.url ? `url(${ backgroundImage.url })` : 'none',
			backgroundSize:     'cover',
			backgroundPosition: 'center',
			backgroundRepeat:   'no-repeat',
			minHeight:          `${ minHeight ?? 70 }vh`,
			position:           'relative',
			display:            'flex',
			alignItems:         'center',
			justifyContent:     'center',
			width:              '100%',
		};

		const overlayStyle = {
			position:        'absolute',
			inset:           0,
			backgroundColor: overlayColor || '#000000',
			opacity:         ( overlayOpacity ?? 35 ) / 100,
			pointerEvents:   'none',
		};

		const titleStyle = {
			color:      textColor || '#ffffff',
			fontSize:   '3em',
			fontWeight: '700',
			lineHeight: 1.2,
			textAlign:  'center',
			margin:     0,
			position:   'relative',
			zIndex:     2,
			padding:    '0 40px',
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
											id:  media.id,
											url: media.url,
											alt: media.alt,
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
												alt={ backgroundImage.alt }
												style={ { width: '100%', marginBottom: '8px' } }
											/>
										) }
										<Button onClick={ open } variant="secondary">
											{ backgroundImage?.url
												? 'Change Image'
												: 'Select Image' }
										</Button>
										{ backgroundImage?.url && (
											<Button
												onClick={ () =>
													setAttributes( { backgroundImage: undefined } )
												}
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

					<PanelBody title="Overlay" initialOpen={ false }>
						<p style={ { marginBottom: '8px' } }><strong>Overlay Colour</strong></p>
						<ColorPicker
							color={ overlayColor || '#000000' }
							onChange={ ( value ) => setAttributes( { overlayColor: value } ) }
							enableAlpha={ false }
						/>
						<RangeControl
							label="Opacity (%)"
							value={ overlayOpacity ?? 35 }
							onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody title="Heading" initialOpen={ false }>
						<TextControl
							label="Heading Text"
							value={ title || '' }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<p style={ { marginBottom: '8px' } }><strong>Text Colour</strong></p>
						<ColorPicker
							color={ textColor || '#ffffff' }
							onChange={ ( value ) => setAttributes( { textColor: value } ) }
							enableAlpha={ false }
						/>
					</PanelBody>

					<PanelBody title="Size" initialOpen={ false }>
						<RangeControl
							label="Minimum Height (vh)"
							value={ minHeight ?? 70 }
							onChange={ ( value ) => setAttributes( { minHeight: value } ) }
							min={ 30 }
							max={ 100 }
						/>
						<p style={ { fontSize: '12px', color: '#757575', marginTop: '4px' } }>
							100vh = full viewport height. 70vh is a good starting point for a landing hero.
						</p>
					</PanelBody>

				</InspectorControls>

				{ /* Canvas preview */ }
				<div style={ sectionStyle }>
					<div style={ overlayStyle } />
					{ title ? (
						<h1 style={ titleStyle }>{ title }</h1>
					) : (
						<p style={ { ...titleStyle, color: '#ccc', fontStyle: 'italic', fontSize: '1.2em' } }>
							{ backgroundImage?.url
								? 'Add a heading in the sidebar →'
								: 'Select a background image and heading in the sidebar →' }
						</p>
					) }
				</div>
			</Fragment>
		);
	},

	save() {
		// Server-side rendered via hero_block.php.
		return null;
	},
} );
