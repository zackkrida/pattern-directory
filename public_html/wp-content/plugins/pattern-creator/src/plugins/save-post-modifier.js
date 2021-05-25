/**
 * WordPress dependencies
 */
import { dispatch, useSelect } from '@wordpress/data';
import { store } from '@wordpress/editor';
import { useEffect, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';

// Save the default Gutenberg Function for use later
window.gutenbergSavePost = wp.data.dispatch( store ).savePost;

const SavePostModifier = () => {
	const [ showModal, setShowModal ] = useState( false );
	const [ showConfirmation, setShowConfirmation ] = useState( false );
	const isCurrentPostPublished = useSelect( ( select ) => select( 'core/editor' ).isCurrentPostPublished() );

	useEffect( () => {
		// We want to replace the publish sidebar with our confirmation window.
		dispatch( store ).disablePublishSidebar();

		/**
		 * We currently don't have a hook to intercept Gutenberg save functionality
		 * so we override the `savePost` function.
		 *
		 * This function is still called by gutenberg for autosaving so we need to handle that case as well.
		 *
		 * @param {Object} props
		 * @param {boolean} props.isAutosave Whether autosave is calling this function.
		 */
		dispatch( store ).savePost = ( props ) => {
			if ( props && props.isAutosave ) {
				return;
			}

			setShowModal( true );
		};
	}, [] );

	useEffect( () => {
		setShowConfirmation( isCurrentPostPublished );
	}, [ isCurrentPostPublished ] );

	if ( showConfirmation ) {
		// TO DO: Show save confirmation
	}

	if ( showModal ) {
		// TO DO: Show submission modal
		// Call window.gutenbergSavePost() to save post
	}

	return null;
};

registerPlugin( 'save-post-modifier', {
	render: () => <SavePostModifier />,
} );
