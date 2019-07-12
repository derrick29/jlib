var _ = (function() {
  "use strict";

  var Jlib = function(selector) {
    if (!selector) return;
    if (selector === document) {
      this.elems = [document];
    } else if (selector === window) {
      this.elems = [window];
    } else {
      this.elems = document.querySelectorAll(selector);
    }
  };

  Jlib.prototype.each = function(callback) {
    if (!callback || typeof callback !== "function") return;
    for (let i = 0; i < this.elems.length; i++) {
      callback(this.elems[i], i);
    }
    return this;
  };

  Jlib.prototype.addClass = function(cN) {
    this.each(function(item) {
      item.classList.add(cN);
    });

    return this;
  };

  Jlib.prototype.removeClass = function(cN) {
    this.each(function(item) {
      item.classList.remove(cN);
    });
    return this;
  };

  Jlib.prototype.class = function(cN) {
    let _className;
    this.each(function(item) {
      if (cN) {
        item.className = cN;
      }
      _className = item.className;
    });
    return _className;
  };

  Jlib.prototype.on = function(type, callback) {
    this.each(function(item) {
      item["on" + type] = callback;
    });
    return this;
  };

  Jlib.prototype.text = function(value) {
    let _text = "";
    this.each(function(item) {
      if (value) {
        item.innerHTML = value;
      }
      _text = item.innerHTML;
    });
    return _text;
  };

  Jlib.prototype.value = function(value) {
    let _value;
    this.each(function(item) {
      if (value) {
        item.value = value;
      }
      _value = item.value;
    });

    return _value;
  };

  //document dom events
  Jlib.prototype.ready = function(callback) {
    this.each(function(item) {
      if (item === document) {
        let readyTime = setInterval(function() {
          if (item.readyState !== "complete") {
            return;
          }
          clearInterval(readyTime);
          console.log(
            "%cWelcome to %cJLib %c\n---> %chttps://github.com/derrick29/jlib",
            "color: teal; font-size: 20px",
            "color: black; font-size: 30px; text-shadow: 0 0 8px grey",
            "color: teal; font-size: 10px",
            "color: black; font-size: 10px"
          );
          callback();
        }, 100);
      } else {
        console.error(
          "%cError: $(selector).ready(fn) is only for the document...",
          "color: red; font-size: 10px"
        );
      }
    });
  };

  //ajax function
  Jlib.prototype.fetch = function(options, callback) {
    let xhr;

    let url = options.url;
    let method = options.method;
    let contentType = "";
    let data = options.data;
    let sendData = data;
    let fd = "";

    if (options.method == "POST") {
      contentType = options.contentType;
      xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      switch (contentType) {
        case "application/json":
          xhr.setRequestHeader("Content-Type", "application/json");
          sendData = JSON.stringify(data);
          break;
        case "urlForm":
          // let fd = new FormData();
          Object.keys(data).map(e => {
            fd += `${e}=${data[e]}&`;
          });
          fd = fd.substr(0, fd.length - 1);
          xhr.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded"
          );
        default:
          break;
      }
      xhr.onload = function() {
        if (this.status == 200) {
          callback(this.responseText);
        }
      };
      if (contentType == "application/json") {
        xhr.send(sendData);
      } else {
        xhr.send(fd);
      }
    }
  };

  var init = function(selector) {
    return new Jlib(selector);
  };

  return init;
})();
