"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var InlineSVG = (function (_React$Component) {
  function InlineSVG(props) {
    _classCallCheck(this, InlineSVG);

    _get(Object.getPrototypeOf(InlineSVG.prototype), "constructor", this).call(this, props);
    this.state = { loading: true };
  }

  _inherits(InlineSVG, _React$Component);

  _createClass(InlineSVG, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      SVGCache.instance.subscribe(this, this.props.src, function (component) {
        component.setState({ loading: false });
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.loading) {
        React.createElement("span", null);
      } else {
        return React.DOM.span({
          className: this.props.className,
          dangerouslySetInnerHTML: {
            __html: SVGCache.instance.getItem(this.props.src).content
          }
        });
      }
    }
  }]);

  return InlineSVG;
})(React.Component);

InlineSVG.displayName = "InlineSVG";

var SVGCache = (function () {
  _createClass(SVGCache, null, [{
    key: "instance",
    get: function get() {
      if (!this.singleton) {
        this.singleton = new SVGCache();
      }

      return this.singleton;
    }
  }]);

  function SVGCache() {
    _classCallCheck(this, SVGCache);

    this.cache = {};
  }

  _createClass(SVGCache, [{
    key: "getItem",
    value: function getItem(src) {
      if (!this.cache[src]) {
        this.cache[src] = {
          subscribers: []
        };
      }

      return this.cache[src];
    }
  }, {
    key: "subscribe",
    value: function subscribe(subscriber, src, callback) {
      var item = this.getItem(src);

      switch (item.state) {
        case "loaded":
          callback(subscriber);
          break;
        case "loading":
          item.subscribers.push(subscriber);
          break;
        default:
          item.subscribers.push(subscriber);
          this.load(src, callback);
      }
    }
  }, {
    key: "load",
    value: function load(src, callback) {
      var item = this.getItem(src);
      if (item.state == "loaded" || item.state == "loading") {
        return false;
      }

      var request = jQuery.ajax({
        method: "GET",
        dataType: "text",
        url: src
      });

      request.success(function (data) {
        item.state = "loaded";
        item.content = data;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = item.subscribers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var subscriber = _step.value;

            if (callback) {
              callback(subscriber);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });

      return true;
    }
  }]);

  return SVGCache;
})();