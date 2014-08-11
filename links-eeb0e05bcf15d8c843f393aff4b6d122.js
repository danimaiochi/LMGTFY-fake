function rand(e) {
    return Math.floor(Math.random() * e)
}

function gentlyEncode(e) {
    return encodeURIComponent ? encodeURIComponent(e).replace(/%20(\D)?/g, "+$1").replace(/'/g, escape("'")) : escape(e).replace(/\+/g, "%2B").replace(/%20/g, "+")
}

function gentlyDecode(e) {
    return decodeURIComponent ? decodeURIComponent(e) : unescape(e)
}

$.fn.copyButton = function (e, t) {
    var n = this;
    n.css("visibility", "hidden");
    var i = new ZeroClipboard.Client,
        o = function () {
            n.css("visibility", "visible")
        },
        a = function () {
            i.setText($(e).val().trim())
        };
    return i.setHandCursor(!0), i.addEventListener("load", o), i.addEventListener("mouseOver", a), i.addEventListener("complete", t), i.glue(n.get(0)), n
},

$.fn.centerOver = function (e, t, n) {
    t = t || 0, n = n || 0;
    var i = this;
    return i.css({
        top: (e.position().top + e.outerHeight() / 2 - i.height() / 2 + t).px(),
        left: (e.position().left + e.outerWidth() / 2 - i.width() / 2 + n).px()
    }), i
},

$.fn.sponsor = function (e, t) {
    var n = this;
    return $.getJSON(e, function (e) {
        var i = e.slots[rand(e.slots.length)],
            o = i.id,
            a = n.find("a");
        a.attr("href", i.url), a.find("img").attr("src", i.image), a.find("p").html(i.message), pageTracker && (pageTracker._trackPageview("/sponsor/" + o), a.unbind("click"), a.click(function () {
            pageTracker._trackPageview("/outgoing/sponsor/" + o)
        })), t && t.call(n)
    }), n
}, Number.prototype.px = function () {
    return this.toString() + "px"
}, $.fn.countDown = function () {
    function e() {
        var n = parseInt((a - new Date) / 1e3);
        o.text(t(n)), n > 0 && setTimeout(e, 1e3)
    }
    function t(e) {
        var t, i, o, a;
        if (0 >= e) return "--:--:--";
        if (e > 86400) {
            a = parseInt(e / 60 / 60 / 24);
            var r = a > 1 ? "s" : "";
            return a.toString() + " day" + r
        }
        return o = e % 60, i = parseInt(e / 60 % 60), t = parseInt(e / 60 / 60), t + ":" + n(i) + ":" + n(o)
    }
    function n(e) {
        var t = 10 > e ? "0" : "";
        return t + e
    }
    function i(e) {
        var t = $.trim(e);
        return t = t.replace(/-/, "/").replace(/-/, "/"), new Date(t)
    }
    var o = this,
        a = i(this.attr("data-ends-at"));
    e()
}, $.fn.loadDeferredImageSource = function () {
    return this.find("img[data-deferred-src]").each(function (e, t) {
        $(t).attr("src", $(t).data("deferred-src"))
    })
}, function (e) {
    function t(e) {
        return e = e.replace(/_/, "-").toLowerCase(), e.length > 3 && (e = e.substring(0, 3) + e.substring(3).toUpperCase()), e
    }
    e.localize = function (n, i) {
        function o(e, t, n) {
            n = n || 1;
            var r;
            i && i.loadBase && 1 == n ? (u = {}, r = e + ".json", a(r, e, t, n)) : 1 == n ? (u = {}, o(e, t, 2)) : 2 == n && t.length >= 2 ? (r = e + "-" + t.substring(0, 2) + ".json", a(r, e, t, n)) : 3 == n && t.length >= 5 ? (r = e + "-" + t.substring(0, 5) + ".json", a(r, e, t, n)) : l(u)
        }
        function a(t, n, a, r) {
            i.pathPrefix && (t = i.pathPrefix + "/" + t), e.getJSON(t, null, function (t) {
                e.extend(u, t), s(u), o(n, a, r + 1)
            })
        }
        function r(t) {
            void 0 === e.localize.data[n] && (e.localize.data[n] = {}), e.extend(!0, e.localize.data[n], t);
            var i;
            h.each(function () {
                elem = e(this), key = elem.attr("rel").match(/localize\[(.*?)\]/)[1], i = c(key, t), i && (elem.is("input") ? elem.val(i) : elem.html(i))
            })
        }
        function s(e) {
            i.callback ? i.callback(e, r) : r(e)
        }
        function l(e) {
            i.finish && i.finish(e)
        }
        function c(e, t) {
            for (var n = e.split(/\./), i = t; n.length > 0;) {
                if (!i) return null;
                i = i[n.shift()]
            }
            return i
        }
        function d(e) {
            if ("string" == typeof e) return "^" + e + "$";
            if (e.length) {
                for (var t = [], n = e.length; n--;) t.push(d(e[n]));
                return t.join("|")
            }
            return e
        }
        var h = this,
            u = {};
        i = i || {};
        var p = {
            async: e.ajaxSettings.async,
            timeout: e.ajaxSettings.timeout
        };
        e.ajaxSetup({
            async: !1,
            timeout: i && i.timeout ? i.timeout : 500
        });
        var f = t(i && i.language ? i.language : e.defaultLanguage);
        return i.skipLanguage && f.match(d(i.skipLanguage)) ? (l(u), void 0) : (o(n, f, 1), e.ajaxSetup(p), void 0)
    }, e.fn.localize = e.localize, e.localize.data = {}, e.defaultLanguage = t(navigator.language ? navigator.language : navigator.userLanguage)
}(jQuery), function (e) {
    e.proMarket = function (t, n) {
        e("body").proMarket(t, n)
    }, e.fn.proMarket = function (e, t) {
        return this.append('<IFRAME WIDTH="1" HEIGHT="1" MARGINWIDTH="0" MARGINHEIGHT="0" HSPACE="0" VSPACE="0" FRAMEBORDER="0" SCROLLING="no" SRC="http://pbid.pro-market.net/engine?site=' + e.toString() + ";size=1x1;kw=" + t + '"></IFRAME>'), this
    }
}(jQuery), function (e) {
    e.querystringvalues = e.queryStringValues = e.QueryStringValues = e.QueryStringvalues = e.queryStringValues = e.queryStringvalues = e.querystringValues = e.getqueryString = e.queryString = e.querystring = e.QueryString = e.Querystring = e.getQueryString = e.getquerystring = e.getQuerystring = function (t) {
        if (defaults = {
            defaultvalue: null
        }, t = e.extend(defaults, t), qs = location.search.substring(1, location.search.length), 0 == qs.length) return t.defaultvalue;
        qs = qs.replace(/\+/g, " ");
        for (var n = qs.split("&"), i = 0; i < n.length; i++) {
            var o, a = n[i].split("="),
                r = gentlyDecode(a[0]);
            if (o = 2 == a.length ? gentlyDecode(a[1]) : r, r == t.id || i == t.id - 1) return o
        }
        return t.defaultvalue
    }
}(jQuery), $.fn.trackClickEvent = function () {
    return this.each(function () {
        $(this).click(function (e) {
            if (e.stopPropagation(), pageTracker) {
                var t = $(this).attr("data-tracking-category"),
                    n = $(this).attr("data-tracking-label");
                pageTracker._trackEvent(t, "click", n)
            }
        })
    })
}, function () {
    function e() {
        "WebSocket" in window && t()
    }
    function t() {
        wsHost = "ws://live-ws.lmgtfy.com:8080/lmgtfy_ws", o = new WebSocket(wsHost)
    }
    function n(e) {
        e.bind("keyup", i)
    }
    function i(e) {
        o.readyState == o.OPEN && (txt = $(e.target).val(), o.send(txt))
    }
    var o;
    window.LmgtfyWS = function (t) {
        e(), n(t)
    }
}();
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function (e) {
        return "string" == typeof e && (e = document.getElementById(e)), e.addClass || (e.hide = function () {
            this.style.display = "none"
        }, e.show = function () {
            this.style.display = ""
        }, e.addClass = function (e) {
            this.removeClass(e), this.className += " " + e
        }, e.removeClass = function (e) {
            for (var t = this.className.split(/\s+/), n = -1, i = 0; i < t.length; i++) t[i] == e && (n = i, i = t.length);
            return n > -1 && (t.splice(n, 1), this.className = t.join(" ")), this
        }, e.hasClass = function (e) {
            return !!this.className.match(new RegExp("\\s*" + e + "\\s*"))
        }), e
    },
    setMoviePath: function (e) {
        this.moviePath = e
    },
    dispatch: function (e, t, n) {
        var i = this.clients[e];
        i && i.receiveEvent(t, n)
    },
    register: function (e, t) {
        this.clients[e] = t
    },
    getDOMObjectPosition: function (e, t) {
        for (var n = {
            left: 0,
            top: 0,
            width: e.width ? e.width : e.offsetWidth,
            height: e.height ? e.height : e.offsetHeight
        }; e && e != t;) n.left += e.offsetLeft, n.top += e.offsetTop, e = e.offsetParent;
        return n
    },
    Client: function (e) {
        this.handlers = {}, this.id = ZeroClipboard.nextId++, this.movieId = "ZeroClipboardMovie_" + this.id, ZeroClipboard.register(this.id, this), e && this.glue(e)
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: !1,
    movie: null,
    clipText: "",
    handCursorEnabled: !0,
    cssEffects: !0,
    handlers: null,
    glue: function (e, t, n) {
        this.domElement = ZeroClipboard.$(e);
        var i = 99;
        this.domElement.style.zIndex && (i = parseInt(this.domElement.style.zIndex, 10) + 1), "string" == typeof t ? t = ZeroClipboard.$(t) : "undefined" == typeof t && (t = document.getElementsByTagName("body")[0]);
        var o = ZeroClipboard.getDOMObjectPosition(this.domElement, t);
        this.div = document.createElement("div");
        var a = this.div.style;
        if (a.position = "absolute", a.left = "" + o.left + "px", a.top = "" + o.top + "px", a.width = "" + o.width + "px", a.height = "" + o.height + "px", a.zIndex = i, "object" == typeof n) for (addedStyle in n) a[addedStyle] = n[addedStyle];
        t.appendChild(this.div), this.div.innerHTML = this.getHTML(o.width, o.height)
    },
    getHTML: function (e, t) {
        var n = "",
            i = "id=" + this.id + "&width=" + e + "&height=" + t;
        if (navigator.userAgent.match(/MSIE/)) {
            var o = location.href.match(/^https/i) ? "https://" : "http://";
            n += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + o + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + e + '" height="' + t + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + i + '"/><param name="wmode" value="transparent"/></object>'
        } else n += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + e + '" height="' + t + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + i + '" wmode="transparent" />';
        return n
    },
    hide: function () {
        this.div && (this.div.style.left = "-2000px")
    },
    show: function () {
        this.reposition()
    },
    destroy: function () {
        if (this.domElement && this.div) {
            this.hide(), this.div.innerHTML = "";
            var e = document.getElementsByTagName("body")[0];
            try {
                e.removeChild(this.div)
            } catch (t) {}
            this.domElement = null, this.div = null
        }
    },
    reposition: function (e) {
        if (e && (this.domElement = ZeroClipboard.$(e), this.domElement || this.hide()), this.domElement && this.div) {
            var t = ZeroClipboard.getDOMObjectPosition(this.domElement),
                n = this.div.style;
            n.left = "" + t.left + "px", n.top = "" + t.top + "px"
        }
    },
    setText: function (e) {
        this.clipText = e, this.ready && this.movie.setText(e)
    },
    addEventListener: function (e, t) {
        e = e.toString().toLowerCase().replace(/^on/, ""), this.handlers[e] || (this.handlers[e] = []), this.handlers[e].push(t)
    },
    setHandCursor: function (e) {
        this.handCursorEnabled = e, this.ready && this.movie.setHandCursor(e)
    },
    setCSSEffects: function (e) {
        this.cssEffects = !! e
    },
    receiveEvent: function (e, t) {
        switch (e = e.toString().toLowerCase().replace(/^on/, "")) {
        case "load":
            if (this.movie = document.getElementById(this.movieId), !this.movie) {
                var n = this;
                return setTimeout(function () {
                    n.receiveEvent("load", null)
                }, 1), void 0
            }
            if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                var n = this;
                return setTimeout(function () {
                    n.receiveEvent("load", null)
                }, 100), this.ready = !0, void 0
            }
            this.ready = !0, this.movie.setText(this.clipText), this.movie.setHandCursor(this.handCursorEnabled);
            break;
        case "mouseover":
            this.domElement && this.cssEffects && (this.domElement.addClass("hover"), this.recoverActive && this.domElement.addClass("active"));
            break;
        case "mouseout":
            this.domElement && this.cssEffects && (this.recoverActive = !1, this.domElement.hasClass("active") && (this.domElement.removeClass("active"), this.recoverActive = !0), this.domElement.removeClass("hover"));
            break;
        case "mousedown":
            this.domElement && this.cssEffects && this.domElement.addClass("active");
            break;
        case "mouseup":
            this.domElement && this.cssEffects && (this.domElement.removeClass("active"), this.recoverActive = !1)
        }
        if (this.handlers[e]) for (var i = 0, o = this.handlers[e].length; o > i; i++) {
            var a = this.handlers[e][i];
            "function" == typeof a ? a(this, t) : "object" == typeof a && 2 == a.length ? a[0][a[1]](this, t) : "string" == typeof a && window[a](this, t)
        }
    }
}, function (e, t, n, i) {
    "use strict";
    var o = n("html"),
        a = n(e),
        r = n(t),
        s = n.fancybox = function () {
            s.open.apply(this, arguments)
        },
        l = navigator.userAgent.match(/msie/i),
        c = null,
        d = t.createTouch !== i,
        h = function (e) {
            return e && e.hasOwnProperty && e instanceof n
        },
        u = function (e) {
            return e && "string" === n.type(e)
        },
        p = function (e) {
            return u(e) && e.indexOf("%") > 0
        },
        f = function (e) {
            return e && !(e.style.overflow && "hidden" === e.style.overflow) && (e.clientWidth && e.scrollWidth > e.clientWidth || e.clientHeight && e.scrollHeight > e.clientHeight)
        },
        g = function (e, t) {
            var n = parseInt(e, 10) || 0;
            return t && p(e) && (n = s.getViewport()[t] / 100 * n), Math.ceil(n)
        },
        m = function (e, t) {
            return g(e, t) + "px"
        };
    n.extend(s, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !d,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: .5,
            leftRatio: .5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3e3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeChange: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (e, t) {
            return e && (n.isPlainObject(t) || (t = {}), !1 !== s.close(!0)) ? (n.isArray(e) || (e = h(e) ? n(e).get() : [e]), n.each(e, function (o, a) {
                var r, l, c, d, p, f, g, m = {};
                "object" === n.type(a) && (a.nodeType && (a = n(a)), h(a) ? (m = {
                    href: a.data("fancybox-href") || a.attr("href"),
                    title: a.data("fancybox-title") || a.attr("title"),
                    isDom: !0,
                    element: a
                }, n.metadata && n.extend(!0, m, a.metadata())) : m = a), r = t.href || m.href || (u(a) ? a : null), l = t.title !== i ? t.title : m.title || "", c = t.content || m.content, d = c ? "html" : t.type || m.type, !d && m.isDom && (d = a.data("fancybox-type"), d || (p = a.prop("class").match(/fancybox\.(\w+)/), d = p ? p[1] : null)), u(r) && (d || (s.isImage(r) ? d = "image" : s.isSWF(r) ? d = "swf" : "#" === r.charAt(0) ? d = "inline" : u(a) && (d = "html", c = a)), "ajax" === d && (f = r.split(/\s+/, 2), r = f.shift(), g = f.shift())), c || ("inline" === d ? r ? c = n(u(r) ? r.replace(/.*(?=#[^\s]+$)/, "") : r) : m.isDom && (c = a) : "html" === d ? c = r : d || r || !m.isDom || (d = "inline", c = a)), n.extend(m, {
                    href: r,
                    type: d,
                    content: c,
                    title: l,
                    selector: g
                }), e[o] = m
            }), s.opts = n.extend(!0, {}, s.defaults, t), t.keys !== i && (s.opts.keys = t.keys ? n.extend({}, s.defaults.keys, t.keys) : !1), s.group = e, s._start(s.opts.index)) : void 0
        },
        cancel: function () {
            var e = s.coming;
            e && !1 !== s.trigger("onCancel") && (s.hideLoading(), s.ajaxLoad && s.ajaxLoad.abort(), s.ajaxLoad = null, s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), s.coming = null, s.current || s._afterZoomOut(e))
        },
        close: function (e) {
            s.cancel(), !1 !== s.trigger("beforeClose") && (s.unbindEvents(), s.isActive && (s.isOpen && e !== !0 ? (s.isOpen = s.isOpened = !1, s.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), s.wrap.stop(!0, !0).removeClass("fancybox-opened"), s.transitions[s.current.closeMethod]()) : (n(".fancybox-wrap").stop(!0).trigger("onReset").remove(), s._afterZoomOut())))
        },
        play: function (e) {
            var t = function () {
                    clearTimeout(s.player.timer)
                },
                n = function () {
                    t(), s.current && s.player.isActive && (s.player.timer = setTimeout(s.next, s.current.playSpeed))
                },
                i = function () {
                    t(), r.unbind(".player"), s.player.isActive = !1, s.trigger("onPlayEnd")
                },
                o = function () {
                    s.current && (s.current.loop || s.current.index < s.group.length - 1) && (s.player.isActive = !0, r.bind({
                        "onCancel.player beforeClose.player": i,
                        "onUpdate.player": n,
                        "beforeLoad.player": t
                    }), n(), s.trigger("onPlayStart"))
                };
            e === !0 || !s.player.isActive && e !== !1 ? o() : i()
        },
        next: function (e) {
            var t = s.current;
            t && (u(e) || (e = t.direction.next), s.jumpto(t.index + 1, e, "next"))
        },
        prev: function (e) {
            var t = s.current;
            t && (u(e) || (e = t.direction.prev), s.jumpto(t.index - 1, e, "prev"))
        },
        jumpto: function (e, t, n) {
            var o = s.current;
            o && (e = g(e), s.direction = t || o.direction[e >= o.index ? "next" : "prev"], s.router = n || "jumpto", o.loop && (0 > e && (e = o.group.length + e % o.group.length), e %= o.group.length), o.group[e] !== i && (s.cancel(), s._start(e)))
        },
        reposition: function (e, t) {
            var i, o = s.current,
                a = o ? o.wrap : null;
            a && (i = s._getPosition(t), e && "scroll" === e.type ? (delete i.position, a.stop(!0, !0).animate(i, 200)) : (a.css(i), o.pos = n.extend({}, o.dim, i)))
        },
        update: function (e) {
            var t = e && e.type,
                n = !t || "orientationchange" === t;
            n && (clearTimeout(c), c = null), s.isOpen && !c && (c = setTimeout(function () {
                var i = s.current;
                i && !s.isClosing && (s.wrap.removeClass("fancybox-tmp"), (n || "load" === t || "resize" === t && i.autoResize) && s._setDimension(), "scroll" === t && i.canShrink || s.reposition(e), s.trigger("onUpdate"), c = null)
            }, n && !d ? 0 : 300))
        },
        toggle: function (e) {
            s.isOpen && (s.current.fitToView = "boolean" === n.type(e) ? e : !s.current.fitToView, d && (s.wrap.removeAttr("style").addClass("fancybox-tmp"), s.trigger("onUpdate")), s.update())
        },
        hideLoading: function () {
            r.unbind(".loading"), n("#fancybox-loading").remove()
        },
        showLoading: function () {
            var e, t;
            s.hideLoading(), e = n('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"), r.bind("keydown.loading", function (e) {
                27 === (e.which || e.keyCode) && (e.preventDefault(), s.cancel())
            }), s.defaults.fixed || (t = s.getViewport(), e.css({
                position: "absolute",
                top: .5 * t.h + t.y,
                left: .5 * t.w + t.x
            }))
        },
        getViewport: function () {
            var t = s.current && s.current.locked || !1,
                n = {
                    x: a.scrollLeft(),
                    y: a.scrollTop()
                };
            return t ? (n.w = t[0].clientWidth, n.h = t[0].clientHeight) : (n.w = d && e.innerWidth ? e.innerWidth : a.width(), n.h = d && e.innerHeight ? e.innerHeight : a.height()), n
        },
        unbindEvents: function () {
            s.wrap && h(s.wrap) && s.wrap.unbind(".fb"), r.unbind(".fb"), a.unbind(".fb")
        },
        bindEvents: function () {
            var e, t = s.current;
            t && (a.bind("orientationchange.fb" + (d ? "" : " resize.fb") + (t.autoCenter && !t.locked ? " scroll.fb" : ""), s.update), e = t.keys, e && r.bind("keydown.fb", function (o) {
                var a = o.which || o.keyCode,
                    r = o.target || o.srcElement;
                return 27 === a && s.coming ? !1 : (o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || r && (r.type || n(r).is("[contenteditable]")) || n.each(e, function (e, r) {
                    return t.group.length > 1 && r[a] !== i ? (s[e](r[a]), o.preventDefault(), !1) : n.inArray(a, r) > -1 ? (s[e](), o.preventDefault(), !1) : void 0
                }), void 0)
            }), n.fn.mousewheel && t.mouseWheel && s.wrap.bind("mousewheel.fb", function (e, i, o, a) {
                for (var r = e.target || null, l = n(r), c = !1; l.length && !(c || l.is(".fancybox-skin") || l.is(".fancybox-wrap"));) c = f(l[0]), l = n(l).parent();
                0 === i || c || s.group.length > 1 && !t.canShrink && (a > 0 || o > 0 ? s.prev(a > 0 ? "down" : "left") : (0 > a || 0 > o) && s.next(0 > a ? "up" : "right"), e.preventDefault())
            }))
        },
        trigger: function (e, t) {
            var i, o = t || s.coming || s.current;
            if (o) {
                if (n.isFunction(o[e]) && (i = o[e].apply(o, Array.prototype.slice.call(arguments, 1))), i === !1) return !1;
                o.helpers && n.each(o.helpers, function (t, i) {
                    i && s.helpers[t] && n.isFunction(s.helpers[t][e]) && s.helpers[t][e](n.extend(!0, {}, s.helpers[t].defaults, i), o)
                }), r.trigger(e)
            }
        },
        isImage: function (e) {
            return u(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function (e) {
            return u(e) && e.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function (e) {
            var t, i, o, a, r, l = {};
            if (e = g(e), t = s.group[e] || null, !t) return !1;
            if (l = n.extend(!0, {}, s.opts, t), a = l.margin, r = l.padding, "number" === n.type(a) && (l.margin = [a, a, a, a]), "number" === n.type(r) && (l.padding = [r, r, r, r]), l.modal && n.extend(!0, l, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = s.group, l.index = e, s.coming = l, !1 === s.trigger("beforeLoad")) return s.coming = null, void 0;
            if (o = l.type, i = l.href, !o) return s.coming = null, s.current && s.router && "jumpto" !== s.router ? (s.current.index = e, s[s.router](s.direction)) : !1;
            if (s.isActive = !0, ("image" === o || "swf" === o) && (l.autoHeight = l.autoWidth = !1, l.scrolling = "visible"), "image" === o && (l.aspectRatio = !0), "iframe" === o && d && (l.scrolling = "scroll"), l.wrap = n(l.tpl.wrap).addClass("fancybox-" + (d ? "mobile" : "desktop") + " fancybox-type-" + o + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), n.extend(l, {
                skin: n(".fancybox-skin", l.wrap),
                outer: n(".fancybox-outer", l.wrap),
                inner: n(".fancybox-inner", l.wrap)
            }), n.each(["Top", "Right", "Bottom", "Left"], function (e, t) {
                l.skin.css("padding" + t, m(l.padding[e]))
            }), s.trigger("onReady"), "inline" === o || "html" === o) {
                if (!l.content || !l.content.length) return s._error("content")
            } else if (!i) return s._error("href");
            "image" === o ? s._loadImage() : "ajax" === o ? s._loadAjax() : "iframe" === o ? s._loadIframe() : s._afterLoad()
        },
        _error: function (e) {
            n.extend(s.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: e,
                content: s.coming.tpl.error
            }), s._afterLoad()
        },
        _loadImage: function () {
            var e = s.imgPreload = new Image;
            e.onload = function () {
                this.onload = this.onerror = null, s.coming.width = this.width / s.opts.pixelRatio, s.coming.height = this.height / s.opts.pixelRatio, s._afterLoad()
            }, e.onerror = function () {
                this.onload = this.onerror = null, s._error("image")
            }, e.src = s.coming.href, e.complete !== !0 && s.showLoading()
        },
        _loadAjax: function () {
            var e = s.coming;
            s.showLoading(), s.ajaxLoad = n.ajax(n.extend({}, e.ajax, {
                url: e.href,
                error: function (e, t) {
                    s.coming && "abort" !== t ? s._error("ajax", e) : s.hideLoading()
                },
                success: function (t, n) {
                    "success" === n && (e.content = t, s._afterLoad())
                }
            }))
        },
        _loadIframe: function () {
            var e = s.coming,
                t = n(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", d ? "auto" : e.iframe.scrolling).attr("src", e.href);
            n(e.wrap).bind("onReset", function () {
                try {
                    n(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (e) {}
            }), e.iframe.preload && (s.showLoading(), t.one("load", function () {
                n(this).data("ready", 1), d || n(this).bind("load.fb", s.update), n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), s._afterLoad()
            })), e.content = t.appendTo(e.inner), e.iframe.preload || s._afterLoad()
        },
        _preloadImages: function () {
            var e, t, n = s.group,
                i = s.current,
                o = n.length,
                a = i.preload ? Math.min(i.preload, o - 1) : 0;
            for (t = 1; a >= t; t += 1) e = n[(i.index + t) % o], "image" === e.type && e.href && ((new Image).src = e.href)
        },
        _afterLoad: function () {
            var e, t, i, o, a, r, l = s.coming,
                c = s.current,
                d = "fancybox-placeholder";
            if (s.hideLoading(), l && s.isActive !== !1) {
                if (!1 === s.trigger("afterLoad", l, c)) return l.wrap.stop(!0).trigger("onReset").remove(), s.coming = null, void 0;
                switch (c && (s.trigger("beforeChange", c), c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), s.unbindEvents(), e = l, t = l.content, i = l.type, o = l.scrolling, n.extend(s, {
                    wrap: e.wrap,
                    skin: e.skin,
                    outer: e.outer,
                    inner: e.inner,
                    current: e,
                    previous: c
                }), a = e.href, i) {
                case "inline":
                case "ajax":
                case "html":
                    e.selector ? t = n("<div>").html(t).find(e.selector) : h(t) && (t.data(d) || t.data(d, n('<div class="' + d + '"></div>').insertAfter(t).hide()), t = t.show().detach(), e.wrap.bind("onReset", function () {
                        n(this).find(t).length && t.hide().replaceAll(t.data(d)).data(d, !1)
                    }));
                    break;
                case "image":
                    t = e.tpl.image.replace("{href}", a);
                    break;
                case "swf":
                    t = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + a + '"></param>', r = "", n.each(e.swf, function (e, n) {
                        t += '<param name="' + e + '" value="' + n + '"></param>', r += " " + e + '="' + n + '"'
                    }), t += '<embed src="' + a + '" type="application/x-shockwave-flash" width="100%" height="100%"' + r + "></embed></object>"
                }
                h(t) && t.parent().is(e.inner) || e.inner.append(t), s.trigger("beforeShow"), e.inner.css("overflow", "yes" === o ? "scroll" : "no" === o ? "hidden" : o), s._setDimension(), s.reposition(), s.isOpen = !1, s.coming = null, s.bindEvents(), s.isOpened ? c.prevMethod && s.transitions[c.prevMethod]() : n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), s.transitions[s.isOpened ? e.nextMethod : e.openMethod](), s._preloadImages()
            }
        },
        _setDimension: function () {
            var e, t, i, o, a, r, l, c, d, h, u, f, v, y, w, b = s.getViewport(),
                x = 0,
                k = !1,
                C = !1,
                S = s.wrap,
                $ = s.skin,
                E = s.inner,
                T = s.current,
                I = T.width,
                _ = T.height,
                L = T.minWidth,
                O = T.minHeight,
                M = T.maxWidth,
                P = T.maxHeight,
                W = T.scrolling,
                j = T.scrollOutside ? T.scrollbarWidth : 0,
                H = T.margin,
                A = g(H[1] + H[3]),
                R = g(H[0] + H[2]);
            if (S.add($).add(E).width("auto").height("auto").removeClass("fancybox-tmp"), e = g($.outerWidth(!0) - $.width()), t = g($.outerHeight(!0) - $.height()), i = A + e, o = R + t, a = p(I) ? (b.w - i) * g(I) / 100 : I, r = p(_) ? (b.h - o) * g(_) / 100 : _, "iframe" === T.type) {
                if (y = T.content, T.autoHeight && 1 === y.data("ready")) try {
                    y[0].contentWindow.document.location && (E.width(a).height(9999), w = y.contents().find("body"), j && w.css("overflow-x", "hidden"), r = w.outerHeight(!0))
                } catch (D) {}
            } else(T.autoWidth || T.autoHeight) && (E.addClass("fancybox-tmp"), T.autoWidth || E.width(a), T.autoHeight || E.height(r), T.autoWidth && (a = E.width()), T.autoHeight && (r = E.height()), E.removeClass("fancybox-tmp"));
            if (I = g(a), _ = g(r), d = a / r, L = g(p(L) ? g(L, "w") - i : L), M = g(p(M) ? g(M, "w") - i : M), O = g(p(O) ? g(O, "h") - o : O), P = g(p(P) ? g(P, "h") - o : P), l = M, c = P, T.fitToView && (M = Math.min(b.w - i, M), P = Math.min(b.h - o, P)), f = b.w - A, v = b.h - R, T.aspectRatio ? (I > M && (I = M, _ = g(I / d)), _ > P && (_ = P, I = g(_ * d)), L > I && (I = L, _ = g(I / d)), O > _ && (_ = O, I = g(_ * d))) : (I = Math.max(L, Math.min(I, M)), T.autoHeight && "iframe" !== T.type && (E.width(I), _ = E.height()), _ = Math.max(O, Math.min(_, P))), T.fitToView) if (E.width(I).height(_), S.width(I + e), h = S.width(), u = S.height(), T.aspectRatio) for (;
            (h > f || u > v) && I > L && _ > O && !(x++ > 19);) _ = Math.max(O, Math.min(P, _ - 10)), I = g(_ * d), L > I && (I = L, _ = g(I / d)), I > M && (I = M, _ = g(I / d)), E.width(I).height(_), S.width(I + e), h = S.width(), u = S.height();
            else I = Math.max(L, Math.min(I, I - (h - f))), _ = Math.max(O, Math.min(_, _ - (u - v)));
            j && "auto" === W && r > _ && f > I + e + j && (I += j), E.width(I).height(_), S.width(I + e), h = S.width(), u = S.height(), k = (h > f || u > v) && I > L && _ > O, C = T.aspectRatio ? l > I && c > _ && a > I && r > _ : (l > I || c > _) && (a > I || r > _), n.extend(T, {
                dim: {
                    width: m(h),
                    height: m(u)
                },
                origWidth: a,
                origHeight: r,
                canShrink: k,
                canExpand: C,
                wPadding: e,
                hPadding: t,
                wrapSpace: u - $.outerHeight(!0),
                skinSpace: $.height() - _
            }), !y && T.autoHeight && _ > O && P > _ && !C && E.height("auto")
        },
        _getPosition: function (e) {
            var t = s.current,
                n = s.getViewport(),
                i = t.margin,
                o = s.wrap.width() + i[1] + i[3],
                a = s.wrap.height() + i[0] + i[2],
                r = {
                    position: "absolute",
                    top: i[0],
                    left: i[3]
                };
            return t.autoCenter && t.fixed && !e && a <= n.h && o <= n.w ? r.position = "fixed" : t.locked || (r.top += n.y, r.left += n.x), r.top = m(Math.max(r.top, r.top + (n.h - a) * t.topRatio)), r.left = m(Math.max(r.left, r.left + (n.w - o) * t.leftRatio)), r
        },
        _afterZoomIn: function () {
            var e = s.current;
            e && (s.isOpen = s.isOpened = !0, s.wrap.css("overflow", "visible").addClass("fancybox-opened"), s.update(), (e.closeClick || e.nextClick && s.group.length > 1) && s.inner.css("cursor", "pointer").bind("click.fb", function (t) {
                n(t.target).is("a") || n(t.target).parent().is("a") || (t.preventDefault(), s[e.closeClick ? "close" : "next"]())
            }), e.closeBtn && n(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb", function (e) {
                e.preventDefault(), s.close()
            }), e.arrows && s.group.length > 1 && ((e.loop || e.index > 0) && n(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev), (e.loop || e.index < s.group.length - 1) && n(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)), s.trigger("afterShow"), e.loop || e.index !== e.group.length - 1 ? s.opts.autoPlay && !s.player.isActive && (s.opts.autoPlay = !1, s.play()) : s.play(!1))
        },
        _afterZoomOut: function (e) {
            e = e || s.current, n(".fancybox-wrap").trigger("onReset").remove(), n.extend(s, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            }), s.trigger("afterClose", e)
        }
    }), s.transitions = {
        getOrigPosition: function () {
            var e = s.current,
                t = e.element,
                n = e.orig,
                i = {},
                o = 50,
                a = 50,
                r = e.hPadding,
                l = e.wPadding,
                c = s.getViewport();
            return !n && e.isDom && t.is(":visible") && (n = t.find("img:first"), n.length || (n = t)), h(n) ? (i = n.offset(), n.is("img") && (o = n.outerWidth(), a = n.outerHeight())) : (i.top = c.y + (c.h - a) * e.topRatio, i.left = c.x + (c.w - o) * e.leftRatio), ("fixed" === s.wrap.css("position") || e.locked) && (i.top -= c.y, i.left -= c.x), i = {
                top: m(i.top - r * e.topRatio),
                left: m(i.left - l * e.leftRatio),
                width: m(o + l),
                height: m(a + r)
            }
        },
        step: function (e, t) {
            var n, i, o, a = t.prop,
                r = s.current,
                l = r.wrapSpace,
                c = r.skinSpace;
            ("width" === a || "height" === a) && (n = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start), s.isClosing && (n = 1 - n), i = "width" === a ? r.wPadding : r.hPadding, o = e - i, s.skin[a](g("width" === a ? o : o - l * n)), s.inner[a](g("width" === a ? o : o - l * n - c * n)))
        },
        zoomIn: function () {
            var e = s.current,
                t = e.pos,
                i = e.openEffect,
                o = "elastic" === i,
                a = n.extend({
                    opacity: 1
                }, t);
            delete a.position, o ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === i && (t.opacity = .1), s.wrap.css(t).animate(a, {
                duration: "none" === i ? 0 : e.openSpeed,
                easing: e.openEasing,
                step: o ? this.step : null,
                complete: s._afterZoomIn
            })
        },
        zoomOut: function () {
            var e = s.current,
                t = e.closeEffect,
                n = "elastic" === t,
                i = {
                    opacity: .1
                };
            n && (i = this.getOrigPosition(), e.closeOpacity && (i.opacity = .1)), s.wrap.animate(i, {
                duration: "none" === t ? 0 : e.closeSpeed,
                easing: e.closeEasing,
                step: n ? this.step : null,
                complete: s._afterZoomOut
            })
        },
        changeIn: function () {
            var e, t = s.current,
                n = t.nextEffect,
                i = t.pos,
                o = {
                    opacity: 1
                },
                a = s.direction,
                r = 200;
            i.opacity = .1, "elastic" === n && (e = "down" === a || "up" === a ? "top" : "left", "down" === a || "right" === a ? (i[e] = m(g(i[e]) - r), o[e] = "+=" + r + "px") : (i[e] = m(g(i[e]) + r), o[e] = "-=" + r + "px")), "none" === n ? s._afterZoomIn() : s.wrap.css(i).animate(o, {
                duration: t.nextSpeed,
                easing: t.nextEasing,
                complete: s._afterZoomIn
            })
        },
        changeOut: function () {
            var e = s.previous,
                t = e.prevEffect,
                i = {
                    opacity: .1
                },
                o = s.direction,
                a = 200;
            "elastic" === t && (i["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=" + a + "px"), e.wrap.animate(i, {
                duration: "none" === t ? 0 : e.prevSpeed,
                easing: e.prevEasing,
                complete: function () {
                    n(this).trigger("onReset").remove()
                }
            })
        }
    }, s.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !d,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: n("html"),
        create: function (e) {
            e = n.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = n('<div class="fancybox-overlay"></div>').appendTo(s.coming ? s.coming.parent : e.parent), this.fixed = !1, e.fixed && s.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function (e) {
            var t = this;
            e = n.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e), this.fixed || (a.bind("resize.overlay", n.proxy(this.update, this)), this.update()), e.closeClick && this.overlay.bind("click.overlay", function (e) {
                return n(e.target).hasClass("fancybox-overlay") ? (s.isActive ? s.close() : t.close(), !1) : void 0
            }), this.overlay.css(e.css).show()
        },
        close: function () {
            var e, t;
            a.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (n(".fancybox-margin").removeClass("fancybox-margin"), e = a.scrollTop(), t = a.scrollLeft(), this.el.removeClass("fancybox-lock"), a.scrollTop(e).scrollLeft(t)), n(".fancybox-overlay").remove().hide(), n.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function () {
            var e, n = "100%";
            this.overlay.width(n).height("100%"), l ? (e = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), r.width() > e && (n = r.width())) : r.width() > a.width() && (n = r.width()), this.overlay.width(n).height(r.height())
        },
        onReady: function (e, t) {
            var i = this.overlay;
            n(".fancybox-overlay").stop(!0, !0), i || this.create(e), e.locked && this.fixed && t.fixed && (i || (this.margin = r.height() > a.height() ? n("html").css("margin-right").replace("px", "") : !1), t.locked = this.overlay.append(t.wrap), t.fixed = !1), e.showEarly === !0 && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function (e, t) {
            var i, o;
            t.locked && (this.margin !== !1 && (n("*").filter(function () {
                return "fixed" === n(this).css("position") && !n(this).hasClass("fancybox-overlay") && !n(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), i = a.scrollTop(), o = a.scrollLeft(), this.el.addClass("fancybox-lock"), a.scrollTop(i).scrollLeft(o)), this.open(e)
        },
        onUpdate: function () {
            this.fixed || this.update()
        },
        afterClose: function (e) {
            this.overlay && !s.coming && this.overlay.fadeOut(e.speedOut, n.proxy(this.close, this))
        }
    }, s.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function (e) {
            var t, i, o = s.current,
                a = o.title,
                r = e.type;
            if (n.isFunction(a) && (a = a.call(o.element, o)), u(a) && "" !== n.trim(a)) {
                switch (t = n('<div class="fancybox-title fancybox-title-' + r + '-wrap">' + a + "</div>"), r) {
                case "inside":
                    i = s.skin;
                    break;
                case "outside":
                    i = s.wrap;
                    break;
                case "over":
                    i = s.inner;
                    break;
                default:
                    i = s.skin, t.appendTo("body"), l && t.width(t.width()), t.wrapInner('<span class="child"></span>'), s.current.margin[2] += Math.abs(g(t.css("margin-bottom")))
                }
                t["top" === e.position ? "prependTo" : "appendTo"](i)
            }
        }
    }, n.fn.fancybox = function (e) {
        var t, i = n(this),
            o = this.selector || "",
            a = function (a) {
                var r, l, c = n(this).blur(),
                    d = t;
                a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || c.is(".fancybox-wrap") || (r = e.groupAttr || "data-fancybox-group", l = c.attr(r), l || (r = "rel", l = c.get(0)[r]), l && "" !== l && "nofollow" !== l && (c = o.length ? n(o) : i, c = c.filter("[" + r + '="' + l + '"]'), d = c.index(this)), e.index = d, s.open(c, e) !== !1 && a.preventDefault())
            };
        return e = e || {}, t = e.index || 0, o && e.live !== !1 ? r.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", a) : i.unbind("click.fb-start").bind("click.fb-start", a), this.filter("[data-fancybox-start=1]").trigger("click"), this
    }, r.ready(function () {
        var t, a;
        n.scrollbarWidth === i && (n.scrollbarWidth = function () {
            var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                t = e.children(),
                i = t.innerWidth() - t.height(99).innerWidth();
            return e.remove(), i
        }), n.support.fixedPosition === i && (n.support.fixedPosition = function () {
            var e = n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                t = 20 === e[0].offsetTop || 15 === e[0].offsetTop;
            return e.remove(), t
        }()), n.extend(s.defaults, {
            scrollbarWidth: n.scrollbarWidth(),
            fixed: n.support.fixedPosition,
            parent: n("body")
        }), t = n(e).width(), o.addClass("fancybox-lock-test"), a = n(e).width(), o.removeClass("fancybox-lock-test"), n("<style type='text/css'>.fancybox-margin{margin-right:" + (a - t) + "px;}</style>").appendTo("head")
    })
}(window, document, jQuery), $.localize.data.lmgtfy = {
    setup: {
        type_question: "Type a question, click a button.",
        share_link: "Share the link below.",
        or: "or"
    },
    play: {
        step_1: "Step 1: Type in your question",
        step_2: "Step 2: Click the Search button",
        pwnage: "Was that so hard?",
        nice: "It's that easy."
    },
    link: {
        creating: "Creating...",
        fetching: "Fetching...",
        copied: "URL copied to clipboard",
        shortened: "Bitly link copied to clipboard"
    },
    urls: {
        logo: "",
        search: "http://www.google.com/search?btnG=1&pws=0&q=",
        lucky_search: "http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&pws=0&q="
    }
},

$(function () {
    function e() {
        h()
    }
    function t() {
        return window.location.hostname.match(/^lmlm/)
    }
    function n() {
        return window.location.hostname.match(/lmlmlmlmlmlmlmlmlmlm/)
    }
    function i() {
        var e = $("#about-lmgtfy"),
            t = window.location.hostname.split(".")[0].toUpperCase(),
            n = t.replace(/^LM/, "").replace(/TFY$/, "");
        e.on("show.bs.modal", function () {
            e.find("h4").text(t), e.find("p[rel*=pitch]").text(t + " is for all those people who miss opportunities to use " + n + ", and need to be told of it's existence."), e.find("p[rel*=genesis]").html("It was inspired by all of the tweets I saw where people were like &quot;Dude, you should've " + n + "'d 'em!&quot")
        })
    }
    function o() {
        if (n()) {
            var e = $("<img>");
            e.attr("src", "/assets/nevergo-1ce363b3e47f7039f137288a82e26560.jpg"), $(".primary").html(e), document.title = "Dude...", i()
        } else if (t()) {
            for (var o = window.location.hostname.match(/lm/g).length - 1, a = $("[rel*=pre_logo]"), r = $("[rel*=post_logo]"), s = o; s > 0; s--) a.before(a.clone().addClass("insanity-pre-" + s)), r.after(r.clone().addClass("insanity-post-" + s)), document.title = "Let me " + document.title + " that for you";
            var l = $(".logo"),
                c = l.prop("scrollWidth"),
                d = l.width();
            c > d && (offset = c - d, l.css({
                position: "relative",
                left: -1 * offset
            })), i()
        }
    }
    function a() {
        $("#link").one("mouseover", function () {
            $.event.trigger({
                type: "callout:show"
            })
        }), $("#go").click(function () {
            return window.location.href = T.val(), !1
        }), $("#reset").click(function () {
            return m($(this).attr("url")), !1
        }), $("#shorten").click(function () {
            return p("link.fetching", 0, !0), $.getJSON("http://api.bitly.com/v3/shorten?format=json&login=lmgtfy&apiKey=R_f0a33bc297052f6faea2a898b80662f0&longUrl=" + gentlyEncode(T.val()), function (e) {
                T.val(e.data.url).focus().select(), p("link.fetching", 1500)
            }), $(this).hide(), $("#reset").show(), !1
        }), $("#language select").change(function () {
            var e = window.location,
                t = e.hostname.match(/[^.]+\.(?:[^.]+)$/)[0],
                n = e.protocol + "//" + $(this).val() + "." + t + e.pathname;
            window.location.href = n
        }), $("[data-tracking-category]").trackClickEvent(), $(document).bind("callout:show", function () {
            $("#callout").show()
        })
    }
    function r() {
        setTimeout(function () {
            $("#logo").css("opacity", 1)
        }, 2e3);
        var e = {
            pathPrefix: "lang",
            skipLanguage: /^en-US/,
            callback: function (e, t) {
                t(e), h(), null === e.lucky_button && $("#lucky").hide()
            },
            finish: function (e) {
                e.urls && e.urls.logo ? $("#logo").load(function () {
                    $(this).css("opacity", 1)
                }).attr("src", e.urls.logo) : $("#logo").css("opacity", 1)
            }
        },
            t = $.getQueryString({
                id: "lang"
            }) || s();
        t && (e.language = t), $("[rel*=localize]").localize("lmgtfy", e)
    }
    function s() {
        return l() || c()
    }
    function l() {
        var e = window.location.hostname.split(".")[0],
            t = e.match(/^[a-z]{2}(?:-[a-z]{2})?$/i);
        return t ? t[0] : null
    }
    function c() {
        var e = {
            klingon: "xx-KL",
            images: "en-IM",
            image: "en-IM",
            maps: "en-MP",
            map: "en-MP",
            videos: "en-VD",
            video: "en-VD",
            news: "en-NW",
            shopping: "en-SH",
            products: "en-SH",
            product: "en-SH",
            photos: "en-PC",
            photo: "en-PC",
            picasaweb: "en-PC",
            picasa: "en-PC",
            plus: "en-PS",
            profiles: "en-PF",
            profile: "en-PF",
            books: "en-BK",
            book: "en-BK",
            finance: "en-FI",
            scholar: "en-SC",
            bing: "en-BI",
            lmbtfy: "en-BI",
            snopes: "en-SN",
            wiki: "en-WI",
            wikipedia: "en-WI",
            doge: "en-DO"
        };
        for (var t in e) if (window.location.hostname.match(t)) return e[t];
        return null
    }
    function d(e) {
        var t = e.split(/\./);
        return 1 == t.length ? $.localize.data.lmgtfy[t[0]] : $.localize.data.lmgtfy[t[0]][t[1]]
    }
    function h() {
        $("#about p").each(function () {
            $(this).html($(this).text().replace(/(@([a-zA-Z0-9_]+))/g, '<a href="http://twitter.com/$2">$1</a>'))
        })
    }
    function u(e) {
        S.html(d(e))
    }
    function p(e, t, n, i) {
        t = t || 2500, _.html(d(e)).show().centerOver(T), n || setTimeout(function () {
            _.fadeOut(3 * (t / 4), i)
        }, t / 4)
    }
    function f() {
        $("form.search").submit(function () {
            return $("#search").click(), !1
        }), u("setup.type_question"), k.focus().select(), $("input[type=button]").click(function () {
            u("setup.share_link");
            var e = window.location,
                t = e.protocol + "//" + e.hostname + e.pathname + "?",
                n = gentlyEncode(k.val());
            $.proMarket("120083", n), strings = ["q=" + n], "lucky" == this.id && strings.push("l=1"), t += strings.join("&"), g(t)
        }), LmgtfyWS(k)
    }
    function g(e) {
        m(e), $("#link").centerOver($("#link_placeholder")).show(), p("link.creating", 1500, !1, function () {
            I.fadeIn(), I.centerOver(T, 28), $("#copy").copyButton(T, function () {
                p("link.copied", 1500)
            })
        }), T.focus().select()
    }
    function m(e) {
        $("#shorten").show(), $("#reset").attr("url", e).hide(), T.val(e).focus().select()
    }
    function v() {
        location.hash = "", $("#already-seen a.again").click(function (e) {
            e.stopPropagation(), $.fancybox.close()
        }), $("#already-seen").loadDeferredImageSource(), $.fancybox.open([{
            href: "#already-seen"
        }], {
            afterClose: b,
            autoSize: !1,
            width: 728,
            height: 376,
            closeBtn: !1
        }), pageTracker && pageTracker._trackEvent("Ads", "popup", "Already seen")
    }
    function y() {
        $.proMarket("120083", gentlyEncode(x)), w(), u("play.step_1")
    }
    function w() {
        var e = navigator.userAgent;
        e.indexOf("Windows NT 5") >= 0 ? C.attr("src", "/assets/mouse_arrow_windows-9f7bc06a1b66be507f555f09134c1c19.png") : e.indexOf("Mac OS X") >= 0 && C.attr("src", "/assets/mouse_arrow_mac-6c943258a76668213ca2d7262050d3a4.png")
    }
    function b() {
        function e(t, i) {
            var o = t.substr(0, i + 1);
            k.attr("value", o), i < t.length ? setTimeout(function () {
                e(t, i + 1)
            }, 240 * Math.random()) : n()
        }
        function n() {
            u("play.step_2"), C.animate({
                top: (E.position().top + 20).px(),
                left: (E.position().left + 30).px()
            }, 2e3, "swing", function () {
                var e = 1 == $.getQueryString({
                    id: "n"
                }) ? "play.nice" : "play.pwnage";
                u(e), E.addClass("active"), setTimeout(a, 2e3), location.hash = "seen"
            })
        }
        function i() {
            return t() ? o() : !1
        }
        function o() {
            var e = window.location.href;
            return e = e.replace(/http:\/\/lm/, "http://"), e = e.replace(/tfy\.(com|local)/, ".$1"), e = e.replace(/\#seen$/, "")
        }
        function a() {
            if (!$.getQueryString({
                id: "debug"
            })) {
                var e = $.localize.data.lmgtfy.urls.search;
                E.attr("id") == $("#lucky").attr("id") && (e = $.localize.data.lmgtfy.urls.lucky_search);
                var t = i();
                page = t ? t : e + gentlyEncode(x), window.location.href = "https://www.google.com.br/#q=" + $("#hidden-term").val()
            }
        }
        $.getQueryString({
            id: "fwd"
        }) && a(), $("body").css("cursor", "wait"), C.show(), C.animate({
            top: (k.position().top + 15).px(),
            left: (k.position().left + 10).px()
        }, 1500, "swing", function () {
            k.focus(), C.animate({
                top: "+=18px",
                left: "+=10px"
            }, "fast"), e(x, 0)
        })
    }
    var x = $("#busca").val(),
        k = $("#search-term"),
        C = $("#fake_mouse"),
        S = $("#instructions"),
        E = "1" == $.getQueryString({
            id: "l"
        }) ? $("#lucky") : $("#search"),
        T = $("#link input.link"),
        I = $("#link_buttons"),
        _ = $("#link_message");
    r(), e(), a(), o(), x ? (y(), "#seen" == location.hash ? v() : b()) : f()
});