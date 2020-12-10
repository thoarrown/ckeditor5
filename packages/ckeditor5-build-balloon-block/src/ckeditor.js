/* eslint-disable no-undef */
/* eslint-disable array-bracket-spacing */
/* eslint-disable space-in-parens */
/* eslint-disable arrow-parens */
/* eslint-disable computed-property-spacing */
/* eslint-disable template-curly-spacing */
/* eslint-disable max-len */
/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import '../theme/theme.css';

import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Autosave from '@ckeditor/ckeditor5-autosave/src/autosave';
// The editor creator to use.
import BalloonEditorBase from '@ckeditor/ckeditor5-editor-balloon/src/ballooneditor';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Mention from '@ckeditor/ckeditor5-mention/src/mention';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersArrows from '@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js';
import SpecialCharactersEssentials from '@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js';
import SpecialCharactersLatin from '@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js';
import SpecialCharactersText from '@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation';
import Title from '@ckeditor/ckeditor5-heading/src/title';
// Add new
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount';
import sanitize from 'sanitize-html';

export default class BalloonEditor extends BalloonEditorBase {}

// Plugins to include in the build.
BalloonEditor.builtinPlugins = [
	Essentials,
	UploadAdapter,
	Autoformat,
	BlockToolbar,
	Bold,
	Italic,
	BlockQuote,
	CKFinder,
	EasyImage,
	Heading,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	Link,
	List,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	Table,
	TableToolbar,
	Underline,
	WordCount,
	Autosave,
	Title,
	Alignment,
	TextTransformation,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersText,
	TableProperties,
	TableCellProperties,
	HtmlEmbed,
	Mention,
	MentionCustomization
];

// Editor configuration.
BalloonEditor.defaultConfig = {
	blockToolbar: [
		'heading',
		'|',
		'bulletedList',
		'numberedList',
		'|',
		'indent',
		'outdent',
		'|',
		'imageUpload',
		'blockQuote',
		'mediaEmbed',
		'|',
		'specialCharacters',
		'htmlEmbed'
	],
	toolbar: {
		items: ['bold', 'italic', 'underline', 'link', 'alignment']
	},
	image: {
		toolbar: [
			'imageStyle:full',
			'imageStyle:side',
			'|',
			'imageTextAlternative'
		]
	},
	link: {
		decorators: [
			{
				mode: 'manual',
				label: 'Open in a new tab',
				defaultValue: true,
				attributes: {
					target: '_blank',
					rel: 'noopener noreferrer'
				}
			},
			{
				mode: 'manual',
				defaultValue: false,
				label: 'NoFollow',
				attributes: {
					rel: 'nofollow'
				}
			}
		]
	},
	ckfinder: {
		// Open the file manager in the pop-up window.
		openerMethod: 'popup'
	},
	htmlEmbed: {
		showPreviews: false,
		sanitizeHtml(inputHtml) {
			// Strip unsafe elements and attributes, e.g.:
			// the `<script>` elements and `on*` attributes.
			const outputHtml = sanitize(inputHtml);

			return {
				html: outputHtml
				// true or false depending on whether the sanitizer stripped anything.
			};
		}
	},
	mention: {
		feeds: [
			{
				marker: '@',
				feed: getFeedItems,
				itemRenderer: customItemRenderer
			}
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	autosave: {
		save() {
			// The saveData() function must return a promise
			// which should be resolved when the data is successfully saved.
			// return saveData(editor.getData());
		}
	},
	mediaEmbed: {
		extraProviders: [
			{
				name: 'tiktok',
				url: /^https?:\/\/www.?tiktok\.com\/(@.*)\/video\/([0-9]*)\/?/,
				html: (match) => {
					return `<blockquote class="tiktok-embed" cite="${match[0]}" data-video-id="${match[2]}" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="${match[1]}" href="https://www.tiktok.com/${match[1]}">${match[1]}</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>`;
				}
			}
		]
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: 'en'
};

function MentionCustomization(editor) {
	// The upcast converter will convert <a class="mention" href="" data-user-id="">
	// elements to the model 'mention' attribute.
	editor.conversion.for('upcast').elementToAttribute({
		view: {
			name: 'a',
			key: 'data-mention',
			classes: 'mention',
			attributes: {
				href: true,
				'data-user-id': true
			}
		},
		model: {
			key: 'mention',
			value: (viewItem) => {
				// The mention feature expects that the mention attribute value
				// in the model is a plain object with a set of additional attributes.
				// In order to create a proper object, use the toMentionAttribute helper method:
				const mentionAttribute = editor.plugins
					.get('Mention')
					.toMentionAttribute(viewItem, {
						// Add any other properties that you need.
						link: viewItem.getAttribute('href'),
						userId: viewItem.getAttribute('data-user-id')
					});

				return mentionAttribute;
			}
		},
		converterPriority: 'high'
	});

	// Downcast the model 'mention' text attribute to a view <a> element.
	editor.conversion.for('downcast').attributeToElement({
		model: 'mention',
		view: (modelAttributeValue, { writer }) => {
			// Do not convert empty attributes (lack of value means no mention).
			if (!modelAttributeValue) {
				return;
			}

			return writer.createAttributeElement(
				'a',
				{
					class: 'mention',
					'data-mention': modelAttributeValue.id,
					'data-user-id': modelAttributeValue.userId,
					href: modelAttributeValue.link
				},
				{
					// Make mention attribute to be wrapped by other attribute elements.
					priority: 20,
					// Prevent merging mentions together.
					id: modelAttributeValue.uid
				}
			);
		},
		converterPriority: 'high'
	});
}

const items = [
	{
		id: '@swarley',
		userId: '1',
		name: 'Barney Stinson',
		link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439'
	},
	{
		id: '@lilypad',
		userId: '2',
		name: 'Lily Aldrin',
		link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989'
	},
	{
		id: '@marshmallow',
		userId: '3',
		name: 'Marshall Eriksen',
		link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981'
	},
	{
		id: '@rsparkles',
		userId: '4',
		name: 'Robin Scherbatsky',
		link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627'
	},
	{
		id: '@tdog',
		userId: '5',
		name: 'Ted Mosby',
		link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140'
	}
];

function getFeedItems(queryText) {
	// As an example of an asynchronous action, return a promise
	// that resolves after a 100ms timeout.
	// This can be a server request or any sort of delayed action.
	return new Promise((resolve) => {
		setTimeout(() => {
			const itemsToDisplay = items
				// Filter out the full list of all items to only those matching the query text.
				.filter(isItemMatching)
				// Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
				.slice(0, 10);

			resolve(itemsToDisplay);
		}, 100);
	});

	// Filtering function - it uses `name` and `username` properties of an item to find a match.
	function isItemMatching(item) {
		// Make the search case-insensitive.
		const searchString = queryText.toLowerCase();

		// Include an item in the search results if name or username includes the current user input.
		return (
			item.name.toLowerCase().includes(searchString) ||
			item.id.toLowerCase().includes(searchString)
		);
	}
}

function customItemRenderer(item) {
	const itemElement = document.createElement('span');

	itemElement.classList.add('custom-item');
	itemElement.id = `mention-list-item-id-${item.userId}`;
	itemElement.textContent = `${item.name} `;

	const usernameElement = document.createElement('span');

	usernameElement.classList.add('custom-item-username');
	usernameElement.textContent = item.id;

	itemElement.appendChild(usernameElement);

	return itemElement;
}
