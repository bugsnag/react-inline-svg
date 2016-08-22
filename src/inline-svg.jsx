function request(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState === 4) {
      callback(xhr.status === 200, xhr.responseText);
    }
  }, false);
  xhr.open('GET', url, true);
  xhr.send();
}

function extend(Child, Parent) {
  function Temp() {
    this.constructor = Child;
  }
  Temp.prototype = Parent.prototype;
  Child.prototype = new Temp();
}

function InlineSVG(props) {
  React.Component.call(this, props);
  this.state = {
    loading: true,
    content: null,
  };
}

extend(InlineSVG, React.Component);

InlineSVG.propTypes = {
  src: React.PropTypes.string.isRequired,
};

InlineSVG.prototype.componentDidMount =
InlineSVG.prototype.componentWillReceiveProps = function(props) {
  this.load(props ? props.src : this.props.src);
};

InlineSVG.prototype.load = function(src) {
  var that = this;
  InlineSVG.cache.load(src, function(item) {
    that.setState({
      loading: false,
      content: item
    });
  });
};

InlineSVG.prototype.render = function() {
  return React.createElement('span', {
    className: 'InlineSVG' +
      (this.state.loading ? ' InlineSVG--loading' : '') +
      (this.props.className ? ' ' + this.props.className : ''),
    dangerouslySetInnerHTML: {__html: this.state.content}
  });
};

var cache = InlineSVG.cache = {};

InlineSVG.cache.load = function(url, callback) {
  var item = cache[url];
  if (!item) {
    item = cache[url] = {
      url: url,
      loading: true,
      content: null,
      callbacks: [],
    };
    if (callback) {
      item.callbacks.push(callback);
    }
    request(url, function(success, content) {
      item.content = content;
      item.loading = false;
      while (item.callbacks.length) {
        item.callbacks.shift()(content);
      }
    });
  } else if (callback) {
    if (item.loading) {
      item.callbacks.push(callback);
    } else {
      callback(item.content);
    }
  }
};