var Util = require('./util');
var Base = require('./base');
var Boundry = function(cfg) {
    this.cfg = Util.mix({
        width:0,
        height:0
    },cfg)
    this.init();
}
Util.extend(Boundry, Base, {
    init: function() {
        var self = this;
        self._xtop = 0;
        self._xright = 0;
        self._xleft = 0;
        self._xbottom = 0;
        self.refresh({
            width: self.cfg.width,
            height: self.cfg.height
        });
    },
    reset: function() {
        this.resetTop();
        this.resetLeft();
        this.resetBottom();
        this.resetRight();
        return this;
    },
    resetTop: function() {
        this._xtop = 0;
        this.refresh();
        return this;
    },
    resetLeft: function() {
        this._xleft = 0;
        this.refresh();
        return this;
    },
    resetBottom: function() {
        this._xbottom = 0;
        this.refresh();
        return this;
    },
    resetRight: function() {
        this._xright = 0;
        this.refresh();
        return this;
    },
    expandTop: function(top) {
        this._xtop = top;
        this.refresh();
        return this;
    },
    expandLeft: function(left) {
        this._xleft = left;
        this.refresh();
        return this;
    },
    expandRight: function(right) {
        this._xright = right;
        this.refresh();
        return this;
    },
    expandBottom: function(bottom) {
        this._xbottom = bottom;
        this.refresh();
        return this;
    },
    refresh: function(cfg) {
        Util.mix(this.cfg,cfg);
        this.top = this._xtop;
        this.left = this._xleft;
        this.bottom = (cfg && cfg.height || this.cfg.height || 0) - this._xbottom;
        this.right = (cfg && cfg.width || this.cfg.width || 0) - this._xright;
        return this;
    }
});

if (typeof module == 'object' && module.exports) {
    module.exports = Boundry;
} else {
    return Boundry;
}