"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("../theme/htmlembed.css");

var _buttonview = _interopRequireDefault(require("@ckeditor/ckeditor5-ui/src/button/buttonview"));

var _inserthtmlembedcommand = _interopRequireDefault(require("./inserthtmlembedcommand"));

var _plugin = _interopRequireDefault(require("@ckeditor/ckeditor5-core/src/plugin"));

var _updatehtmlembedcommand = _interopRequireDefault(require("./updatehtmlembedcommand"));

var _cancel = _interopRequireDefault(require("@ckeditor/ckeditor5-html-embed/theme/icons/cancel.svg"));

var _save = _interopRequireDefault(require("@ckeditor/ckeditor5-html-embed/theme/icons/save.svg"));

var _createelement = _interopRequireDefault(require("@ckeditor/ckeditor5-utils/src/dom/createelement"));

var _ckeditorerror = require("@ckeditor/ckeditor5-utils/src/ckeditorerror");

var _pencil = _interopRequireDefault(require("@ckeditor/ckeditor5-core/theme/icons/pencil.svg"));

var _utils = require("@ckeditor/ckeditor5-widget/src/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * The HTML embed editing feature.
 *
 * @extends module:core/plugin~Plugin
 */
var HtmlEmbedEditing =
/*#__PURE__*/
function (_Plugin) {
  _inherits(HtmlEmbedEditing, _Plugin);

  _createClass(HtmlEmbedEditing, null, [{
    key: "pluginName",

    /**
     * @inheritDoc
     */
    get: function get() {
      return 'HtmlEmbedEditing';
    }
    /**
     * @inheritDoc
     */

  }]);

  function HtmlEmbedEditing(editor) {
    var _this;

    _classCallCheck(this, HtmlEmbedEditing);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HtmlEmbedEditing).call(this, editor));
    editor.config.define('htmlEmbed', {
      showPreviews: false,
      sanitizeHtml: function sanitizeHtml(rawHtml) {
        /**
         * When using the HTML embed feature with the `htmlEmbed.showPreviews=true` option, it is strongly recommended to
         * define a sanitize function that will clean up the input HTML in order to avoid XSS vulnerability.
         *
         * For a detailed overview, check the {@glink features/html-embed HTML embed feature} documentation.
         *
         * @error html-embed-provide-sanitize-function
         */
        (0, _ckeditorerror.logWarning)('html-embed-provide-sanitize-function');
        return {
          html: rawHtml,
          hasChanged: false
        };
      }
    });
    return _this;
  }
  /**
   * @inheritDoc
   */


  _createClass(HtmlEmbedEditing, [{
    key: "init",
    value: function init() {
      var editor = this.editor;
      var schema = editor.model.schema;
      schema.register('rawHtml', {
        isObject: true,
        allowWhere: '$block',
        allowAttributes: ['value']
      });
      editor.commands.add('updateHtmlEmbed', new _updatehtmlembedcommand["default"](editor));
      editor.commands.add('insertHtmlEmbed', new _inserthtmlembedcommand["default"](editor));

      this._setupConversion();
    }
    /**
     * Prepares converters for the feature.
     *
     * @private
     */

  }, {
    key: "_setupConversion",
    value: function _setupConversion() {
      var editor = this.editor;
      var t = editor.t;
      var _view = editor.editing.view;
      var htmlEmbedConfig = editor.config.get('htmlEmbed'); // Register div.raw-html-embed as a raw content element so all of it's content will be provided
      // as a view element's custom property while data upcasting.

      editor.data.processor.registerRawContentMatcher({
        name: 'div',
        classes: 'raw-html-embed'
      });
      editor.conversion["for"]('upcast').elementToElement({
        view: {
          name: 'div',
          classes: 'raw-html-embed'
        },
        model: function model(viewElement, _ref) {
          var writer = _ref.writer;
          // The div.raw-html-embed is registered as a raw content element,
          // so all it's content is available in a custom property.
          return writer.createElement('rawHtml', {
            value: viewElement.getCustomProperty('$rawContent')
          });
        }
      });
      editor.conversion["for"]('dataDowncast').elementToElement({
        model: 'rawHtml',
        view: function view(modelElement, _ref2) {
          var writer = _ref2.writer;
          return writer.createRawElement('div', {
            "class": 'raw-html-embed'
          }, function (domElement) {
            domElement.innerHTML = modelElement.getAttribute('value') || '';
          });
        }
      });
      editor.conversion["for"]('editingDowncast').elementToElement({
        triggerBy: {
          attributes: ['value']
        },
        model: 'rawHtml',
        view: function view(modelElement, _ref3) {
          var writer = _ref3.writer;
          var domContentWrapper, state, props;
          var viewContainer = writer.createContainerElement('div', {
            "class": 'raw-html-embed',
            'data-html-embed-label': t('HTML snippet'),
            dir: editor.locale.uiLanguageDirection
          }); // Widget cannot be a raw element because the widget system would not be able
          // to add its UI to it. Thus, we need this wrapper.

          var viewContentWrapper = writer.createRawElement('div', {
            "class": 'raw-html-embed__content-wrapper'
          }, function (domElement) {
            domContentWrapper = domElement;
            renderContent({
              domElement: domElement,
              editor: editor,
              state: state,
              props: props
            }); // Since there is a `data-cke-ignore-events` attribute set on the wrapper element in the editable mode,
            // the explicit `mousedown` handler on the `capture` phase is needed to move the selection onto the whole
            // HTML embed widget.

            domContentWrapper.addEventListener('mousedown', function () {
              if (state.isEditable) {
                var model = editor.model;
                var selectedElement = model.document.selection.getSelectedElement(); // Move the selection onto the whole HTML embed widget if it's currently not selected.

                if (selectedElement !== modelElement) {
                  model.change(function (writer) {
                    return writer.setSelection(modelElement, 'on');
                  });
                }
              }
            }, true);
          }); // API exposed on each raw HTML embed widget so other features can control a particular widget.

          var rawHtmlApi = {
            makeEditable: function makeEditable() {
              state = Object.assign({}, state, {
                isEditable: true
              });
              renderContent({
                domElement: domContentWrapper,
                editor: editor,
                state: state,
                props: props
              });

              _view.change(function (writer) {
                writer.setAttribute('data-cke-ignore-events', 'true', viewContentWrapper);
              }); // This could be potentially pulled to a separate method called focusTextarea().


              domContentWrapper.querySelector('textarea').focus();
            },
            save: function save(newValue) {
              // If the value didn't change, we just cancel. If it changed,
              // it's enough to update the model – the entire widget will be reconverted.
              if (newValue !== state.getRawHtmlValue()) {
                editor.execute('updateHtmlEmbed', newValue);
                editor.editing.view.focus();
              } else {
                this.cancel();
              }
            },
            cancel: function cancel() {
              state = Object.assign({}, state, {
                isEditable: false
              });
              renderContent({
                domElement: domContentWrapper,
                editor: editor,
                state: state,
                props: props
              });
              editor.editing.view.focus();

              _view.change(function (writer) {
                writer.removeAttribute('data-cke-ignore-events', viewContentWrapper);
              });
            }
          };
          state = {
            showPreviews: htmlEmbedConfig.showPreviews,
            isEditable: false,
            getRawHtmlValue: function getRawHtmlValue() {
              return modelElement.getAttribute('value') || '';
            }
          };
          props = {
            sanitizeHtml: htmlEmbedConfig.sanitizeHtml,
            textareaPlaceholder: t('Paste raw HTML here...'),
            onEditClick: function onEditClick() {
              rawHtmlApi.makeEditable();
            },
            onSaveClick: function onSaveClick(newValue) {
              rawHtmlApi.save(newValue);
            },
            onCancelClick: function onCancelClick() {
              rawHtmlApi.cancel();
            }
          };
          writer.insert(writer.createPositionAt(viewContainer, 0), viewContentWrapper);
          writer.setCustomProperty('rawHtmlApi', rawHtmlApi, viewContainer);
          writer.setCustomProperty('rawHtml', true, viewContainer);
          return (0, _utils.toWidget)(viewContainer, writer, {
            widgetLabel: t('HTML snippet'),
            hasSelectionHandle: true
          });
        }
      });

      function renderContent(_ref4) {
        var domElement = _ref4.domElement,
            editor = _ref4.editor,
            state = _ref4.state,
            props = _ref4.props;
        // Remove all children;
        domElement.textContent = '';
        var domDocument = domElement.ownerDocument;
        var domTextarea;

        if (state.isEditable) {
          var textareaProps = {
            isDisabled: false,
            placeholder: props.textareaPlaceholder
          };
          domTextarea = createDomTextarea({
            domDocument: domDocument,
            state: state,
            props: textareaProps
          });
          domElement.append(domTextarea);
        } else if (state.showPreviews) {
          var previewContainerProps = {
            sanitizeHtml: props.sanitizeHtml
          };
          domElement.append(createPreviewContainer({
            domDocument: domDocument,
            state: state,
            props: previewContainerProps,
            editor: editor
          }));
        } else {
          var _textareaProps = {
            isDisabled: true,
            placeholder: props.textareaPlaceholder
          };
          domElement.append(createDomTextarea({
            domDocument: domDocument,
            state: state,
            props: _textareaProps
          }));
        }

        var buttonsWrapperProps = {
          onEditClick: props.onEditClick,
          onSaveClick: function onSaveClick() {
            props.onSaveClick(domTextarea.value);
          },
          onCancelClick: props.onCancelClick
        };
        domElement.prepend(createDomButtonsWrapper({
          editor: editor,
          domDocument: domDocument,
          state: state,
          props: buttonsWrapperProps,
          domElement: domElement
        }));
      }

      function createDomButtonsWrapper(_ref5) {
        var editor = _ref5.editor,
            domDocument = _ref5.domDocument,
            state = _ref5.state,
            props = _ref5.props,
            domElement = _ref5.domElement;
        var domButtonsWrapper = (0, _createelement["default"])(domDocument, 'div', {
          "class": 'raw-html-embed__buttons-wrapper'
        }); // TODO these should be cached and we should only clone here these cached nodes!

        var domEditButton = createDomButton(editor, 'edit');
        var domSaveButton = createDomButton(editor, 'save');
        var domCancelButton = createDomButton(editor, 'cancel');

        if (state.isEditable) {
          var clonedDomSaveButton = domSaveButton.cloneNode(true);
          var clonedDomCancelButton = domCancelButton.cloneNode(true);
          clonedDomSaveButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            props.onSaveClick();
          });
          clonedDomCancelButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            props.onCancelClick();
          });
          domButtonsWrapper.appendChild(clonedDomSaveButton);
          domButtonsWrapper.appendChild(clonedDomCancelButton);
        } else {
          var clonedDomEditButton = domEditButton.cloneNode(true);
          clonedDomEditButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            props.onEditClick();
          });
          domElement.addEventListener('dblclick', function (evt) {
            evt.preventDefault();
            props.onEditClick();
          });
          domButtonsWrapper.classList.add('raw-html-embed__hidden'); // domButtonsWrapper.appendChild( clonedDomEditButton );
        }

        return domButtonsWrapper;
      }

      function createDomTextarea(_ref6) {
        var domDocument = _ref6.domDocument,
            state = _ref6.state,
            props = _ref6.props;
        var domTextarea = (0, _createelement["default"])(domDocument, 'textarea', {
          placeholder: props.placeholder,
          "class": 'ck ck-reset ck-input ck-input-text raw-html-embed__source'
        });
        domTextarea.disabled = props.isDisabled;
        domTextarea.value = state.getRawHtmlValue();
        return domTextarea;
      }

      function createPreviewContainer(_ref7) {
        var domDocument = _ref7.domDocument,
            state = _ref7.state,
            props = _ref7.props,
            editor = _ref7.editor;
        var domPreviewContainer = (0, _createelement["default"])(domDocument, 'div', {
          "class": 'raw-html-embed__preview',
          dir: editor.locale.contentLanguageDirection
        });
        var sanitizeOutput = props.sanitizeHtml(state.getRawHtmlValue());
        domPreviewContainer.innerHTML = sanitizeOutput.html;
        return domPreviewContainer;
      }
    }
  }]);

  return HtmlEmbedEditing;
}(_plugin["default"]); // Returns a toggle mode button DOM element that can be cloned and used in conversion.
//
//  @param {module:utils/locale~Locale} locale Editor locale.
//  @param {'edit'|'save'|'cancel'} type Type of button to create.
//  @returns {HTMLElement}


exports["default"] = HtmlEmbedEditing;

function createDomButton(editor, type) {
  var t = editor.locale.t;
  var buttonView = new _buttonview["default"](editor.locale);
  var command = editor.commands.get('updateHtmlEmbed');
  buttonView.set({
    tooltipPosition: editor.locale.uiLanguageDirection === 'rtl' ? 'e' : 'w',
    icon: _pencil["default"],
    tooltip: true
  });
  buttonView.render();

  if (type === 'edit') {
    buttonView.set({
      icon: _pencil["default"],
      label: t('Edit source'),
      "class": 'raw-html-embed__edit-button'
    });
  } else if (type === 'save') {
    buttonView.set({
      icon: _save["default"],
      label: t('Lưu lại'),
      withText: true,
      "class": 'raw-html-embed__save-button'
    });
    buttonView.bind('isEnabled').to(command, 'isEnabled');
  } else {
    buttonView.set({
      icon: _cancel["default"],
      label: t('Hủy bỏ'),
      withText: true,
      "class": 'raw-html-embed__cancel-button'
    });
  }

  buttonView.destroy();
  return buttonView.element.cloneNode(true);
}