import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ColorPicker,
	RangeControl,
	SelectControl,
	Button,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import metadata from './block.json';

registerBlockType( metadata.name, {

	edit( { attributes, setAttributes } ) {
		const {
			title,
			textColor,
			fontSize,
			description,
			descriptionColor,
			descriptionFontSize,
			descriptionFontWeight,
			backgroundImage,
			overlayOpacity,
			overlayColor,
			mainImage,
			textAlignment,
		} = attributes;

		// Live-preview styles (mirror banner_block.php output).
		const bannerStyle = {
			backgroundImage: backgroundImage?.url ? `url(${ backgroundImage.url })` : 'none',
			backgroundSize:    'cover',
			backgroundRepeat:  'no-repeat',
			backgroundPosition: 'center',
			minHeight:         '300px',
			position:          'relative',
		};

		const overlayStyle = {
			position:        'absolute',
			inset:           0,
			backgroundColor: overlayColor  || '#000000',
			opacity:         ( overlayOpacity ?? 20 ) / 100,
			pointerEvents:   'none',
		};

		const contentStyle = {
			position:       'relative',
			zIndex:         2,
			display:        'flex',
			alignItems:     'center',
			justifyContent: 'space-between',
			flexDirection:  textAlignment === 'right' ? 'row-reverse' : 'row',
			padding:        '50px',
			gap:            '24px',
		};

		const titleStyle = {
			color:    textColor  || '#ffffff',
			fontSize: `${ fontSize ?? 2 }em`,
			margin:   0,
		};

		const descStyle = {
			color:      descriptionColor      || '#ffffff',
			fontSize:   `${ descriptionFontSize ?? 1 }em`,
			fontWeight: descriptionFontWeight || 'normal',
			marginTop:  '12px',
		};

		const hasContent = title || description;

		return (
			<Fragment>
				{ /* ── Sidebar panels ── */ }
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
												? 'Change Background Image'
												: 'Select Background Image' }
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

					<PanelBody title="Overlay" initialOpen={ false }>
						<p style={ { marginBottom: '8px' } }><strong>Overlay Colour</strong></p>
						<ColorPicker
							color={ overlayColor || '#000000' }
							onChange={ ( value ) => setAttributes( { overlayColor: value } ) }
							enableAlpha={ false }
						/>
						<RangeControl
							label="Opacity (%)"
							value={ overlayOpacity ?? 20 }
							onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>

					<PanelBody title="Title" initialOpen={ false }>
						<TextControl
							label="Title Text"
							value={ title || '' }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<p style={ { marginBottom: '8px' } }><strong>Title Colour</strong></p>
						<ColorPicker
							color={ textColor || '#ffffff' }
							onChange={ ( value ) => setAttributes( { textColor: value } ) }
							enableAlpha={ false }
						/>
						<RangeControl
							label="Font Size (em)"
							value={ fontSize ?? 2 }
							onChange={ ( value ) => setAttributes( { fontSize: value } ) }
							min={ 0.5 }
							max={ 6 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelBody title="Description" initialOpen={ false }>
						<TextareaControl
							label="Description Text"
							value={ description || '' }
							onChange={ ( value ) => setAttributes( { description: value } ) }
						/>
						<p style={ { marginBottom: '8px' } }><strong>Description Colour</strong></p>
						<ColorPicker
							color={ descriptionColor || '#ffffff' }
							onChange={ ( value ) => setAttributes( { descriptionColor: value } ) }
							enableAlpha={ false }
						/>
						<RangeControl
							label="Font Size (em)"
							value={ descriptionFontSize ?? 1 }
							onChange={ ( value ) =>
								setAttributes( { descriptionFontSize: value } )
							}
							min={ 0.5 }
							max={ 4 }
							step={ 0.1 }
						/>
						<SelectControl
							label="Font Weight"
							value={ descriptionFontWeight || 'normal' }
							options={ [
								{ label: 'Normal',  value: 'normal' },
								{ label: 'Bold',    value: 'bold'   },
								{ label: '300',     value: '300'    },
								{ label: '500',     value: '500'    },
								{ label: '700',     value: '700'    },
							] }
							onChange={ ( value ) =>
								setAttributes( { descriptionFontWeight: value } )
							}
						/>
					</PanelBody>

					<PanelBody title="Side Image" initialOpen={ false }>
						<p style={ { marginBottom: '8px', fontSize: '12px', color: '#757575' } }>
							Displayed inside the decorative hoop on the right (or left) of the text.
						</p>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										mainImage: {
											id:  media.id,
											url: media.url,
											alt: media.alt,
										},
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ mainImage?.id }
								render={ ( { open } ) => (
									<div>
										{ mainImage?.url && (
											<img
												src={ mainImage.url }
												alt={ mainImage.alt }
												style={ {
													width:        '120px',
													height:       '120px',
													objectFit:    'cover',
													borderRadius: '50%',
													marginBottom: '8px',
												} }
											/>
										) }
										<Button onClick={ open } variant="secondary">
											{ mainImage?.url
												? 'Change Side Image'
												: 'Select Side Image' }
										</Button>
										{ mainImage?.url && (
											<Button
												onClick={ () =>
													setAttributes( { mainImage: undefined } )
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

					<PanelBody title="Layout" initialOpen={ false }>
						<SelectControl
							label="Text / Image Side"
							value={ textAlignment || 'left' }
							options={ [
								{ label: 'Text left, image right', value: 'left'  },
								{ label: 'Text right, image left', value: 'right' },
							] }
							onChange={ ( value ) => setAttributes( { textAlignment: value } ) }
						/>
					</PanelBody>

				</InspectorControls>

				{ /* ── Editor canvas preview ── */ }
				<div className={ `banner-block text-align-${ textAlignment || 'left' }` }
					 style={ bannerStyle }>

					<div style={ overlayStyle } />

					<div style={ contentStyle }>

						<div className="banner-block-row-text" style={ { flex: 1 } }>
							{ hasContent ? (
								<>
									{ title && (
										<h2 className="banner-block-title" style={ titleStyle }>
											{ title }
										</h2>
									) }
									{ description && (
										<p className="banner-block-description" style={ descStyle }>
											{ description }
										</p>
									) }
								</>
							) : (
								<p style={ { color: '#ccc', fontStyle: 'italic', margin: 0 } }>
									Use the sidebar panels to add a title, description, and images.
								</p>
							) }
						</div>

						{ mainImage?.url && (
							<div className="banner-block-row-image"
								 style={ { position: 'relative', width: '300px', flexShrink: 0 } }>
								<img
									className="banner-block-image"
									src={ mainImage.url }
									alt={ mainImage.alt || '' }
									style={ {
										width:        '250px',
										height:       '250px',
										objectFit:    'cover',
										borderRadius: '50%',
									} }
								/>
							</div>
						) }

					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		// Server-side rendered via banner_block.php — no client-side save needed.
		return null;
	},
} );
