import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ColorPicker,
	RangeControl,
	SelectControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit( { attributes, setAttributes } ) {
		const {
			videoUrl,
			posterImage,
			title,
			caption,
			overlayColor = '#000000',
			overlayOpacity = 25,
			playButtonColor = '#e0ac0f',
			playButtonIconColor = '#ffffff',
			playButtonSize = 'medium',
			enablePulse = true,
			aspectRatio = '16-9',
			modalAriaLabel = 'Video player modal',
			autoplay = true,
		} = attributes;

		// Map aspect ratio string to CSS value
		const aspectRatioMap = {
			'16-9': '16 / 9',
			'4-3': '4 / 3',
			'1-1': '1 / 1',
			'21-9': '21 / 9',
		};

		// Map button size to pixel dimensions
		const sizeMap = {
			small: 60,
			medium: 80,
			large: 100,
		};

		const currentBtnSize = sizeMap[ playButtonSize ] || 80;
		const currentRatio = aspectRatioMap[ aspectRatio ] || '16 / 9';

		const blockProps = useBlockProps( {
			className: `video-popup-block-editor ratio-${ aspectRatio }`,
		} );

		// Container styling
		const cardStyle = {
			position: 'relative',
			width: '100%',
			aspectRatio: currentRatio,
			minHeight: '320px',
			borderRadius: '16px',
			overflow: 'hidden',
			backgroundImage: posterImage?.url ? `url(${ posterImage.url })` : 'none',
			backgroundColor: posterImage?.url ? 'transparent' : '#1f2937',
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
		};

		const overlayStyle = {
			position: 'absolute',
			inset: 0,
			backgroundColor: overlayColor || '#000000',
			opacity: ( overlayOpacity ?? 25 ) / 100,
			zIndex: 1,
			pointerEvents: 'none',
		};

		const contentStyle = {
			position: 'relative',
			zIndex: 2,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			padding: '32px 20px',
			width: '100%',
			maxWidth: '800px',
			gap: '16px',
		};

		const buttonStyle = {
			width: `${ currentBtnSize }px`,
			height: `${ currentBtnSize }px`,
			borderRadius: '50%',
			backgroundColor: playButtonColor || '#e0ac0f',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			cursor: 'pointer',
			boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
			position: 'relative',
			transition: 'transform 0.2s ease',
		};

		const titleStyle = {
			color: '#ffffff',
			fontFamily: 'Ubuntu, sans-serif',
			fontSize: '1.75rem',
			fontWeight: 700,
			margin: 0,
			textShadow: '0 2px 8px rgba(0,0,0,0.7)',
			lineHeight: 1.25,
		};

		const captionStyle = {
			color: '#f3f4f6',
			fontFamily: 'Nunito Sans, sans-serif',
			fontSize: '1.05rem',
			margin: 0,
			textShadow: '0 1px 4px rgba(0,0,0,0.7)',
			lineHeight: 1.4,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="Video Settings" initialOpen={ true }>
						<TextControl
							label="Video URL"
							value={ videoUrl || '' }
							help="Enter a YouTube, Vimeo, or direct MP4/WebM video URL."
							placeholder="https://www.youtube.com/watch?v=..."
							onChange={ ( value ) => setAttributes( { videoUrl: value } ) }
						/>
						<ToggleControl
							label="Autoplay Video"
							help="Automatically begin playback when lightbox opens."
							checked={ autoplay ?? true }
							onChange={ ( value ) => setAttributes( { autoplay: value } ) }
						/>
					</PanelBody>

					<PanelBody title="Cover Image & Aspect Ratio" initialOpen={ true }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										posterImage: {
											id: media.id,
											url: media.url,
											alt: media.alt || '',
										},
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ posterImage?.id }
								render={ ( { open } ) => (
									<div style={ { marginBottom: '16px' } }>
										{ posterImage?.url && (
											<img
												src={ posterImage.url }
												alt={ posterImage.alt || '' }
												style={ {
													width: '100%',
													maxHeight: '160px',
													objectFit: 'cover',
													borderRadius: '8px',
													marginBottom: '8px',
												} }
											/>
										) }
										<div style={ { display: 'flex', gap: '8px' } }>
											<Button onClick={ open } variant="secondary">
												{ posterImage?.url ? 'Change Image' : 'Select Cover Image' }
											</Button>
											{ posterImage?.url && (
												<Button
													onClick={ () => setAttributes( { posterImage: undefined } ) }
													variant="link"
													isDestructive
												>
													Remove
												</Button>
											) }
										</div>
									</div>
								) }
							/>
						</MediaUploadCheck>

						<SelectControl
							label="Aspect Ratio"
							value={ aspectRatio || '16-9' }
							options={ [
								{ label: '16:9 (Standard Widescreen)', value: '16-9' },
								{ label: '4:3 (Classic)', value: '4-3' },
								{ label: '1:1 (Square)', value: '1-1' },
								{ label: '21:9 (Cinematic Ultrawide)', value: '21-9' },
							] }
							onChange={ ( value ) => setAttributes( { aspectRatio: value } ) }
						/>
					</PanelBody>

					<PanelBody title="Overlay & Text" initialOpen={ false }>
						<TextControl
							label="Card Title"
							value={ title || '' }
							placeholder="e.g., Building the Brand"
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
						<TextareaControl
							label="Card Caption / Subtitle"
							value={ caption || '' }
							placeholder="Optional short description..."
							onChange={ ( value ) => setAttributes( { caption: value } ) }
						/>
						<p style={ { marginBottom: '8px', fontWeight: 600 } }>Overlay Colour</p>
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
							max={ 90 }
						/>
					</PanelBody>

					<PanelBody title="Play Button" initialOpen={ false }>
						<p style={ { marginBottom: '8px', fontWeight: 600 } }>Button Background Colour</p>
						<ColorPicker
							color={ playButtonColor || '#e0ac0f' }
							onChange={ ( value ) => setAttributes( { playButtonColor: value } ) }
							enableAlpha={ false }
						/>
						<p style={ { marginTop: '16px', marginBottom: '8px', fontWeight: 600 } }>Icon Colour</p>
						<ColorPicker
							color={ playButtonIconColor || '#ffffff' }
							onChange={ ( value ) => setAttributes( { playButtonIconColor: value } ) }
							enableAlpha={ false }
						/>
						<SelectControl
							label="Button Size"
							value={ playButtonSize || 'medium' }
							options={ [
								{ label: 'Small (60px)', value: 'small' },
								{ label: 'Medium (80px)', value: 'medium' },
								{ label: 'Large (100px)', value: 'large' },
							] }
							onChange={ ( value ) => setAttributes( { playButtonSize: value } ) }
						/>
						<ToggleControl
							label="Enable Pulse Ring Animation"
							help="Adds animated radar pulse rings around the play button."
							checked={ enablePulse ?? true }
							onChange={ ( value ) => setAttributes( { enablePulse: value } ) }
						/>
					</PanelBody>

					<PanelBody title="Accessibility" initialOpen={ false }>
						<TextControl
							label="Modal ARIA Label"
							value={ modalAriaLabel || 'Video player modal' }
							help="Screen reader description for the popup dialog."
							onChange={ ( value ) => setAttributes( { modalAriaLabel: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					<div className="video-popup-card-preview" style={ cardStyle }>
						<div className="video-popup-overlay-preview" style={ overlayStyle } />

						<div className="video-popup-content-preview" style={ contentStyle }>
							<div
								className={ `video-popup-play-btn-preview ${ enablePulse ? 'has-pulse' : '' }` }
								style={ buttonStyle }
								title="Clicking opens video popup on front-end"
							>
								<svg
									width={ Math.round( currentBtnSize * 0.35 ) }
									height={ Math.round( currentBtnSize * 0.35 ) }
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									style={ { marginLeft: '3px' } }
								>
									<path
										d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86a1 1 0 00-1.5.86z"
										fill={ playButtonIconColor || '#ffffff' }
									/>
								</svg>
							</div>

							{ title && (
								<h3 className="video-popup-title-preview" style={ titleStyle }>
									{ title }
								</h3>
							) }

							{ caption && (
								<p className="video-popup-caption-preview" style={ captionStyle }>
									{ caption }
								</p>
							) }

							{ ! posterImage?.url && ! title && ! videoUrl && (
								<div
									style={ {
										marginTop: '12px',
										padding: '8px 16px',
										background: 'rgba(0,0,0,0.6)',
										borderRadius: '6px',
										color: '#d1d5db',
										fontSize: '0.85rem',
									} }
								>
									Configure Video URL and Cover Image in the block sidebar.
								</div>
							) }
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return null;
	},
} );
