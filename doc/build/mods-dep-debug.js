/*generated by KMD*/
KISSY.config('modules',{
    "kg/xscroll/2.3.0/base": {
        "requires": [
            "./util"
        ]
    },
    "kg/xscroll/2.3.0/boundry": {
        "requires": [
            "./util",
            "./base"
        ]
    },
    "kg/xscroll/2.3.0/core": {
        "requires": [
            "./base",
            "./util",
            "./event",
            "./pan",
            "./tap",
            "./pinch",
            "./timer",
            "./scrollbar",
            "./pulldown",
            "./pullup",
            "./boundry",
            "./easing"
        ]
    },
    "kg/xscroll/2.3.0/event": {
        "requires": [
            "./util"
        ]
    },
    "kg/xscroll/2.3.0/infinite": {
        "requires": [
            "./util",
            "./core",
            "./dataset",
            "./swipeedit",
            "./pullup",
            "./pulldown"
        ]
    },
    "kg/xscroll/2.3.0/pan": {
        "requires": [
            "./util",
            "./event"
        ]
    },
    "kg/xscroll/2.3.0/pinch": {
        "requires": [
            "./util",
            "./event"
        ]
    },
    "kg/xscroll/2.3.0/pulldown": {
        "requires": [
            "./util",
            "./base"
        ]
    },
    "kg/xscroll/2.3.0/pullup": {
        "requires": [
            "./util",
            "./base"
        ]
    },
    "kg/xscroll/2.3.0/scrollbar": {
        "requires": [
            "./util"
        ]
    },
    "kg/xscroll/2.3.0/swipeedit": {
        "requires": [
            "./util",
            "./base"
        ]
    },
    "kg/xscroll/2.3.0/tap": {
        "requires": [
            "./util",
            "./event"
        ]
    },
    "kg/xscroll/2.3.0/timer": {
        "requires": [
            "./util",
            "./base",
            "./easing",
            "./bezier"
        ]
    }
});