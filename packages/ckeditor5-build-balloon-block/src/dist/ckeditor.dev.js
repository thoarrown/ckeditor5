"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("../theme/theme.css");

var _alignment = _interopRequireDefault(require("@ckeditor/ckeditor5-alignment/src/alignment"));

var _autoformat = _interopRequireDefault(require("@ckeditor/ckeditor5-autoformat/src/autoformat"));

var _autosave = _interopRequireDefault(require("@ckeditor/ckeditor5-autosave/src/autosave"));

var _ballooneditor = _interopRequireDefault(require("@ckeditor/ckeditor5-editor-balloon/src/ballooneditor"));

var _blockquote = _interopRequireDefault(require("@ckeditor/ckeditor5-block-quote/src/blockquote"));

var _blocktoolbar = _interopRequireDefault(require("@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar"));

var _bold = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/bold"));

var _ckfinder = _interopRequireDefault(require("@ckeditor/ckeditor5-ckfinder/src/ckfinder"));

var _easyimage = _interopRequireDefault(require("@ckeditor/ckeditor5-easy-image/src/easyimage"));

var _essentials = _interopRequireDefault(require("@ckeditor/ckeditor5-essentials/src/essentials"));

var _heading = _interopRequireDefault(require("@ckeditor/ckeditor5-heading/src/heading"));

var _htmlembed = _interopRequireDefault(require("@ckeditor/ckeditor5-html-embed/src/htmlembed"));

var _image = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/image"));

var _imagecaption = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imagecaption"));

var _imagestyle = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imagestyle"));

var _imagetoolbar = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imagetoolbar"));

var _imageupload = _interopRequireDefault(require("@ckeditor/ckeditor5-image/src/imageupload"));

var _indent = _interopRequireDefault(require("@ckeditor/ckeditor5-indent/src/indent"));

var _italic = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/italic"));

var _link = _interopRequireDefault(require("@ckeditor/ckeditor5-link/src/link"));

var _list = _interopRequireDefault(require("@ckeditor/ckeditor5-list/src/list"));

var _mediaembed = _interopRequireDefault(require("@ckeditor/ckeditor5-media-embed/src/mediaembed"));

var _mention = _interopRequireDefault(require("@ckeditor/ckeditor5-mention/src/mention"));

var _paragraph = _interopRequireDefault(require("@ckeditor/ckeditor5-paragraph/src/paragraph"));

var _pastefromoffice = _interopRequireDefault(require("@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice"));

var _specialcharacters = _interopRequireDefault(require("@ckeditor/ckeditor5-special-characters/src/specialcharacters"));

var _specialcharactersarrows = _interopRequireDefault(require("@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js"));

var _specialcharacterscurrency = _interopRequireDefault(require("@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js"));

var _specialcharactersessentials = _interopRequireDefault(require("@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js"));

var _specialcharacterslatin = _interopRequireDefault(require("@ckeditor/ckeditor5-special-characters/src/specialcharacterslatin.js"));

var _specialcharacterstext = _interopRequireDefault(require("@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js"));

var _table = _interopRequireDefault(require("@ckeditor/ckeditor5-table/src/table"));

var _tablecellproperties = _interopRequireDefault(require("@ckeditor/ckeditor5-table/src/tablecellproperties"));

var _tableproperties = _interopRequireDefault(require("@ckeditor/ckeditor5-table/src/tableproperties"));

var _tabletoolbar = _interopRequireDefault(require("@ckeditor/ckeditor5-table/src/tabletoolbar"));

var _texttransformation = _interopRequireDefault(require("@ckeditor/ckeditor5-typing/src/texttransformation"));

var _title = _interopRequireDefault(require("@ckeditor/ckeditor5-heading/src/title"));

var _underline = _interopRequireDefault(require("@ckeditor/ckeditor5-basic-styles/src/underline"));

var _uploadadapter = _interopRequireDefault(require("@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter"));

var _wordcount = _interopRequireDefault(require("@ckeditor/ckeditor5-word-count/src/wordcount"));

var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BalloonEditor =
/*#__PURE__*/
function (_BalloonEditorBase) {
  _inherits(BalloonEditor, _BalloonEditorBase);

  function BalloonEditor() {
    _classCallCheck(this, BalloonEditor);

    return _possibleConstructorReturn(this, _getPrototypeOf(BalloonEditor).apply(this, arguments));
  }

  return BalloonEditor;
}(_ballooneditor["default"]); // Plugins to include in the build.


exports["default"] = BalloonEditor;
BalloonEditor.builtinPlugins = [_essentials["default"], _uploadadapter["default"], _autoformat["default"], _blocktoolbar["default"], _bold["default"], _italic["default"], _blockquote["default"], _ckfinder["default"], _easyimage["default"], _heading["default"], _image["default"], _imagecaption["default"], _imagestyle["default"], _imagetoolbar["default"], _imageupload["default"], _indent["default"], _link["default"], _list["default"], _mediaembed["default"], _paragraph["default"], _pastefromoffice["default"], _table["default"], _tabletoolbar["default"], _underline["default"], _wordcount["default"], _autosave["default"], _title["default"], _alignment["default"], _texttransformation["default"], _specialcharacters["default"], _specialcharactersarrows["default"], _specialcharacterscurrency["default"], _specialcharactersessentials["default"], _specialcharacterslatin["default"], _specialcharacterstext["default"], _tableproperties["default"], _tablecellproperties["default"], _htmlembed["default"], _mention["default"], MentionCustomization]; // Editor configuration.

BalloonEditor.defaultConfig = {
  blockToolbar: ['heading', '|', 'bulletedList', 'numberedList', '|', 'indent', 'outdent', '|', 'imageUpload', 'blockQuote', 'mediaEmbed', '|', 'specialCharacters', 'htmlEmbed'],
  toolbar: {
    items: ['bold', 'italic', 'underline', 'link', 'alignment']
  },
  image: {
    toolbar: ['imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative']
  },
  link: {
    decorators: [{
      mode: 'manual',
      label: 'Open in a new tab',
      defaultValue: true,
      attributes: {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    }, {
      mode: 'manual',
      defaultValue: false,
      label: 'NoFollow',
      attributes: {
        rel: 'nofollow'
      }
    }]
  },
  ckfinder: {
    // Open the file manager in the pop-up window.
    openerMethod: 'popup'
  },
  htmlEmbed: {
    showPreviews: false,
    sanitizeHtml: function sanitizeHtml(inputHtml) {
      // Strip unsafe elements and attributes, e.g.:
      // the `<script>` elements and `on*` attributes.
      var outputHtml = (0, _sanitizeHtml["default"])(inputHtml);
      return {
        html: outputHtml // true or false depending on whether the sanitizer stripped anything.

      };
    }
  },
  mention: {
    feeds: [{
      marker: '@',
      feed: getFeedItems,
      itemRenderer: customItemRenderer
    }]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  autosave: {
    save: function save() {// The saveData() function must return a promise
      // which should be resolved when the data is successfully saved.
      // return saveData(editor.getData());
    }
  },
  mediaEmbed: {
    extraProviders: [{
      name: 'tiktok',
      url: /^https?:\/\/www.?tiktok\.com\/(@.*)\/video\/([0-9]*)\/?/,
      html: function html(match) {
        return "<blockquote class=\"tiktok-embed\" cite=\"".concat(match[0], "\" data-video-id=\"").concat(match[2], "\" style=\"max-width: 605px;min-width: 325px;\" > <section> <a target=\"_blank\" title=\"").concat(match[1], "\" href=\"https://www.tiktok.com/").concat(match[1], "\">").concat(match[1], "</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>");
      }
    }]
  },
  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};

function MentionCustomization(editor) {
  // The upcast converter will convert <a class="mention" href="" data-user-id="">
  // elements to the model 'mention' attribute.
  editor.conversion["for"]('upcast').elementToAttribute({
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
      value: function value(viewItem) {
        // The mention feature expects that the mention attribute value
        // in the model is a plain object with a set of additional attributes.
        // In order to create a proper object, use the toMentionAttribute helper method:
        var mentionAttribute = editor.plugins.get('Mention').toMentionAttribute(viewItem, {
          // Add any other properties that you need.
          link: viewItem.getAttribute('href'),
          userId: viewItem.getAttribute('data-user-id')
        });
        return mentionAttribute;
      }
    },
    converterPriority: 'high'
  }); // Downcast the model 'mention' text attribute to a view <a> element.

  editor.conversion["for"]('downcast').attributeToElement({
    model: 'mention',
    view: function view(modelAttributeValue, _ref) {
      var writer = _ref.writer;

      // Do not convert empty attributes (lack of value means no mention).
      if (!modelAttributeValue) {
        return;
      }

      return writer.createAttributeElement('a', {
        "class": 'mention',
        'data-mention': modelAttributeValue.id,
        'data-user-id': modelAttributeValue.userId,
        href: modelAttributeValue.link
      }, {
        // Make mention attribute to be wrapped by other attribute elements.
        priority: 20,
        // Prevent merging mentions together.
        id: modelAttributeValue.uid
      });
    },
    converterPriority: 'high'
  });
}

var items = [{
  id: '@swarley',
  userId: '1',
  name: 'Barney Stinson',
  link: 'https://www.imdb.com/title/tt0460649/characters/nm0000439'
}, {
  id: '@lilypad',
  userId: '2',
  name: 'Lily Aldrin',
  link: 'https://www.imdb.com/title/tt0460649/characters/nm0004989'
}, {
  id: '@marshmallow',
  userId: '3',
  name: 'Marshall Eriksen',
  link: 'https://www.imdb.com/title/tt0460649/characters/nm0781981'
}, {
  id: '@rsparkles',
  userId: '4',
  name: 'Robin Scherbatsky',
  link: 'https://www.imdb.com/title/tt0460649/characters/nm1130627'
}, {
  id: '@tdog',
  userId: '5',
  name: 'Ted Mosby',
  link: 'https://www.imdb.com/title/tt0460649/characters/nm1102140'
}];

function getFeedItems(queryText) {
  // As an example of an asynchronous action, return a promise
  // that resolves after a 100ms timeout.
  // This can be a server request or any sort of delayed action.
  return new Promise(function (resolve) {
    setTimeout(function () {
      var itemsToDisplay = items // Filter out the full list of all items to only those matching the query text.
      .filter(isItemMatching) // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
      .slice(0, 10);
      resolve(itemsToDisplay);
    }, 100);
  }); // Filtering function - it uses `name` and `username` properties of an item to find a match.

  function isItemMatching(item) {
    // Make the search case-insensitive.
    var searchString = queryText.toLowerCase(); // Include an item in the search results if name or username includes the current user input.

    return item.name.toLowerCase().includes(searchString) || item.id.toLowerCase().includes(searchString);
  }
}

function customItemRenderer(item) {
  var itemElement = document.createElement('span');
  itemElement.classList.add('custom-item');
  itemElement.id = "mention-list-item-id-".concat(item.userId);
  itemElement.textContent = "".concat(item.name, " ");
  var usernameElement = document.createElement('span');
  usernameElement.classList.add('custom-item-username');
  usernameElement.textContent = item.id;
  itemElement.appendChild(usernameElement);
  return itemElement;
}