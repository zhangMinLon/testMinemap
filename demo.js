(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.nativeToast = factory());
}(this, (function () { 'use strict';

    /* eslint-disable no-unused-vars */
    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('Object.assign cannot be called with null or undefined');
        }

        return Object(val);
    }

    function shouldUseNative() {
        try {
            if (!Object.assign) {
                return false;
            }

            var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
            test1[5] = 'de';
            if (Object.getOwnPropertyNames(test1)[0] === '5') {
                return false;
            }

            var test2 = {};
            for (var i = 0; i < 10; i++) {
                test2['_' + String.fromCharCode(i)] = i;
            }
            var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
                return test2[n];
            });
            if (order2.join('') !== '0123456789') {
                return false;
            }

            var test3 = {};
            'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
                test3[letter] = letter;
            });
            if (Object.keys(Object.assign({}, test3)).join('') !==
                'abcdefghijklmnopqrst') {
                return false;
            }

            return true;
        } catch (err) {
            return false;
        }
    }

    var index = shouldUseNative() ? Object.assign : function (target, source) {
        var arguments$1 = arguments;

        var from;
        var to = toObject(target);
        var symbols;

        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments$1[s]);

            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }

            if (getOwnPropertySymbols) {
                symbols = getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        to[symbols[i]] = from[symbols[i]];
                    }
                }
            }
        }

        return to;
    };

    var prevToast = null;

    var icons = {
        warning: "",
        success: "",
        info: "",
        error: ""
    }

    var Toast = function Toast(ref) {
        if ( ref === void 0 ) ref = {};
        var message = ref.message; if ( message === void 0 ) message = '';
        var position = ref.position; if ( position === void 0 ) position = 'bottom';
        var timeout = ref.timeout; if ( timeout === void 0 ) timeout = 4000;
        var el = ref.el; if ( el === void 0 ) el = document.body;
        var square = ref.square; if ( square === void 0 ) square = false;
        var type = ref.type; if ( type === void 0 ) type = '';
        var debug = ref.debug; if ( debug === void 0 ) debug = false;
        var edge = ref.edge; if ( edge === void 0 ) edge = false;

        if (prevToast) {
            prevToast.destroy();
        }

        this.message = message;
        this.position = position;
        this.el = el;
        this.timeout = timeout;

        this.toast = document.createElement('div');
        this.toast.className = "native-toast native-toast-" + (this.position);

        if (type) {
            this.toast.className += " native-toast-" + type;
            // this.message = "<span class=\"native-toast-icon-" + type + "\">" + (icons[type] || '') + "</span>" + (this.message);
        }

        this.toast.innerHTML = this.message;

        if (edge) {
            this.toast.className += ' native-toast-edge';
        }

        if (square) {
            this.toast.style.borderRadius = '3px';
        }

        this.el.appendChild(this.toast);

        prevToast = this;

        this.show();
        if (!debug) {
            this.hide();
        }
    };

    Toast.prototype.show = function show () {
        var this$1 = this;

        setTimeout(function () {
            this$1.toast.classList.add('native-toast-shown');
        }, 300);
    };

    Toast.prototype.hide = function hide () {
        var this$1 = this;

        setTimeout(function () {
            this$1.destroy();
        }, this.timeout);
    };

    Toast.prototype.destroy = function destroy () {
        var this$1 = this;

        if (!this.toast) { return }

        this.toast.classList.remove('native-toast-shown');

        setTimeout(function () {
            if (this$1.toast) {
                this$1.el.removeChild(this$1.toast);
                this$1.toast = null;
            }
        }, 300);
    };

    function toast(options) {
        return new Toast(options)
    }

    var loop = function () {
        var type = list[i];

        toast[type] = function (options) { return toast(index({}, {type: type}, options)); };
    };

    for (var i = 0, list = ['success', 'info', 'warning', 'error']; i < list.length; i += 1) loop();

    return toast;

})));

var message = {
    success : function(){
        nativeToast({
            message: arguments[0],
            type: 'success'
        })
    },

    info: function(){
        nativeToast({
            message: arguments[0],
            type: 'info'
        })
    },

    warn: function(){
        nativeToast({
            message: arguments[0],
            type: 'warning'
        })
    },

    error: function(){
        nativeToast({
            message: arguments[0],
            type: 'error'
        })
    }

};
