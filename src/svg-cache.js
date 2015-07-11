class SVGCache {
  static get instance() {
    if(!this.singleton) {
      this.singleton = new SVGCache();
    }

    return this.singleton;
  }

  constructor() {
    this.cache = {};
  }

  getItem(src) {
    if(!this.cache[src]) {
      this.cache[src] = {
        subscribers: []
      };
    }

    return this.cache[src];
  }

  subscribe(subscriber, src, callback) {
    var item = this.getItem(src);

    switch(item.state) {
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

  load(src, callback) {
    var item = this.getItem(src);
    if(item.state == "loaded" || item.state == "loading") {
      return false;
    }

    var request = jQuery.ajax({
      method: "GET",
      dataType: "text",
      url: src
    });

    item.state = "loading";

    request.success(function (data) {
      item.state = "loaded";
      item.content = data;

      for(let subscriber of item.subscribers) {
        if(callback) {
          callback(subscriber)
        }
      }
    });

    return true;
  }
}
