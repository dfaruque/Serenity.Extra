var Slick;
(function(e) {
    var t;
    (function(t) {
        var i = function() {
            function t(t) {
                this.onFilterApplied = new e.Event;
                this.onCommand = new e.Event;
                this.handler = new e.EventHandler;
                var i = {
                    buttonImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEQAACxEBf2RfkQAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4yMfEgaZUAAACeSURBVDhPvdItDsIwGIfxAoZNAQaDmOEgXAIzsRvgCArNCRBcYAmeO+AQHGBuCWqOhYTP521SQsZI2yzhn/xE3+RxVU3WRoSJoz70OpjiiMxijzH0WhhhgzOeP+RIEOA9E6e4oBqdIFGIr0k8xA43mKjADLXR5wY44IEr1rBGZltIWGIuB9f9P1zgDu+whxW8Q1kXS8T65Tn5x6IypV7aOzNezxwrTQAAAABJRU5ErkJggg==",
                    useColumnFormatter: true,
                    getFilterValues: null
                };
                this.options = $.extend(true, {}, i, t);
                this.handleMenuItemClick = this.handleMenuItemClick.bind(this)
            }
            t.prototype.init = function(e) {
                this.grid = e;
                this.handler.subscribe(e.onHeaderCellRendered, this.handleHeaderCellRendered.bind(this)).subscribe(e.onBeforeHeaderCellDestroy, this.handleBeforeHeaderCellDestroy.bind(this)).subscribe(e.onClick, this.handleBodyMouseDown.bind(this)).subscribe(e.onColumnsResized, this.columnsResized.bind(this));
                e.setColumns(e.getColumns());
                $(document.body).bind("mousedown", this.handleBodyMouseDown = this.handleBodyMouseDown.bind(this))
            }
            ;
            t.prototype.destroy = function() {
                this.handler.unsubscribeAll();
                $(document.body).unbind("mousedown", this.handleBodyMouseDown)
            }
            ;
            t.prototype.handleBodyMouseDown = function(e) {
                if (this.menu && this.menu[0] != e.target && !$.contains(this.menu[0], e.target)) {
                    this.hideMenu()
                }
            }
            ;
            t.prototype.hideMenu = function() {
                if (this.menu) {
                    this.menu.remove();
                    this.menu = null
                }
            }
            ;
            t.prototype.handleHeaderCellRendered = function(e, t) {
                var i = this;
                var r = t.column;
                if (this.options.isFilterable != null && !this.options.isFilterable(r))
                    return;
                var n = $("<div></div>").addClass("slick-header-menubutton").data("column", r);
                if (this.options.buttonImage) {
                    n.css("background-image", "url(" + this.options.buttonImage + ")")
                }
                $(t.node).addClass("has-header-menubutton");
                n.on("click", function(e) {
                    e.stopPropagation();
                    i.showFilter(e)
                }).appendTo(t.node)
            }
            ;
            t.prototype.handleBeforeHeaderCellDestroy = function(e, t) {
                $(t.node).find(".slick-header-menubutton").remove()
            }
            ;
            t.prototype.addMenuItem = function(e, t, i, r, n) {
                var a = $("<div class='slick-header-menuitem'>").data("command", r).data("column", t).bind("click", this.handleMenuItemClick).appendTo(e);
                var o = $("<div class='slick-header-menuicon'>").appendTo(a);
                if (n) {
                    o.css("background-image", "url(" + n + ")")
                }
                $("<span class='slick-header-menucontent'>").text(i).appendTo(a)
            }
            ;
            t.prototype.addMenuInput = function(e, t) {
                var i = this;
                $("<input class='input' placeholder='" + (Q.tryGetText("Site.HeaderFiltersMixin.Search") || "Search") + "' style='margin-top: 5px; width: 206px'>").data("column", t).bind("keyup", function(r) {
                    if (i.options.getFilterValues != null) {
                        i.options.getFilterValues(t, function(n) {
                            if (n == null) {
                                n = i.getFilterValuesByInput($(r.target))
                            } else {
                                var a = i.containsFilter(t, $(r.target).val());
                                n = n.filter(a)
                            }
                            i.updateFilterInputs(e, t, n)
                        })
                    } else
                        i.updateFilterInputs(e, t, i.getFilterValuesByInput($(r.target)))
                }).appendTo(e)
            }
            ;
            t.prototype.updateFilterInputs = function(e, t, i) {
                var r = this;
                var n = "<label><input type='checkbox' value='-1' />" + (Q.tryGetText("Site.HeaderFiltersMixin.SelectAll") || "(Select All)") + "</label>";
                t.filterValues = t.filterValues || [];
                this.workingFilters = t.filterValues.slice(0);
                for (var a = 0; a < i.length; a++) {
                    var o = this.workingFilters.indexOf(i[a]) >= 0;
                    var l = this.getFilterText(t, i[a], true);
                    n += "<label><input type='checkbox' value='" + a + "'" + (o ? " checked='checked'" : "") + "/>" + l + "</label>"
                }
                var s = e.find(".filter");
                s.empty().append($(n));
                $(":checkbox", s).bind("click", function(e) {
                    r.workingFilters = r.changeWorkingFilter(i, r.workingFilters, $(e.target))
                })
            }
            ;
            t.prototype.getFilterText = function(e, t, i) {
                if (t == null)
                    return Q.tryGetText("Site.HeaderFiltersMixin.Null") || "(null)";
                if (this.options.useColumnFormatter && e && e.formatter) {
                    try {
                        var r = {};
                        r[e.field] = t;
                        return e.formatter(-1, -1, t, e, r)
                    } catch (n) {}
                }
                return i ? Q.htmlEncode(t) : "" + t
            }
            ;
            t.prototype.showFilter = function(e) {
                var t = this;
                var i = $(e.target);
                var r = i.data("column");
                r.filterValues = r.filterValues || [];
                this.workingFilters = r.filterValues.slice(0);
                var n = function() {
                    if (!t.menu) {
                        t.menu = $("<div class='slick-header-menu'>").appendTo(document.body)
                    }
                    t.menu.empty();
                    t.addMenuInput(t.menu, r);
                    var n = "<label><input type='checkbox' value='-1' />" + (Q.tryGetText("Site.HeaderFiltersMixin.SelectAll") || "(Select All)") + "</label>";
                    for (var a = 0; a < t.filterItems.length; a++) {
                        var o = t.workingFilters.indexOf(t.filterItems[a]) >= 0;
                        var l = t.getFilterText(r, t.filterItems[a], true);
                        n += "<label><input type='checkbox' value='" + a + "'" + (o ? " checked='checked'" : "") + "/>" + l + "</label>"
                    }
                    var s = $("<div class='filter'>").append($(n)).appendTo(t.menu);
                    $("<button>" + (Q.tryGetText("Site.HeaderFiltersMixin.OkButton") || "OK") + "</button>").appendTo(t.menu).bind("click", function(e) {
                        r.filterValues = t.workingFilters.splice(0);
                        t.setButtonImage(i, r.filterValues.length > 0);
                        t.handleApply(e, r)
                    });
                    $("<button>" + (Q.tryGetText("Site.HeaderFiltersMixin.ClearButton") || "Clear") + "</button>").appendTo(t.menu).bind("click", function(e) {
                        r.filterValues.length = 0;
                        t.setButtonImage(i, false);
                        t.handleApply(e, r)
                    });
                    $("<button>" + (Q.tryGetText("Site.HeaderFiltersMixin.CancelButton") || "Cancel") + "</button>").appendTo(t.menu).bind("click", function(e) {
                        return t.hideMenu()
                    });
                    $(":checkbox", s).bind("click", function(e) {
                        t.workingFilters = t.changeWorkingFilter(t.filterItems, t.workingFilters, $(e.target))
                    });
                    s.css("height", null);
                    var u = t.menu.height();
                    var d = $(e.target).height();
                    var c = $(e.target).offset();
                    var p = c.left - t.menu.width() + $(e.target).width() - 8;
                    var g = c.top + d;
                    var f = $(window).scrollTop();
                    var h = $(window).height() + f;
                    var v = parseInt($("div.content-wrapper").css("padding-top"), 10) || 0;
                    if (g + u > h && h - g + v < g - f) {
                        g -= u + d + 8;
                        if (g < f)
                            g = f
                    }
                    var m = g + u - h;
                    if (m > 0) {
                        s.css("height", s.height() - m)
                    }
                    t.menu.css("top", g).css("left", p > 0 ? p : 0)
                };
                var a = function() {
                    if (t.workingFilters.length === 0) {
                        t.filterItems = t.getFilterValues(t.grid.getData(), r)
                    } else {
                        t.filterItems = t.getAllFilterValues(t.grid.getData().getItems(), r)
                    }
                };
                if (this.options.getFilterValues != null) {
                    this.options.getFilterValues(r, function(e) {
                        if (e == null) {
                            a()
                        } else {
                            t.filterItems = e.slice(0)
                        }
                        n()
                    })
                } else {
                    a();
                    n()
                }
            }
            ;
            t.prototype.columnsResized = function() {
                this.hideMenu()
            }
            ;
            t.prototype.changeWorkingFilter = function(e, t, i) {
                var r = i.val();
                var n = i.parent().parent();
                if (i.val() < 0) {
                    if (i.prop("checked")) {
                        $(":checkbox", n).prop("checked", true);
                        t = e.slice(0)
                    } else {
                        $(":checkbox", n).prop("checked", false);
                        t.length = 0
                    }
                } else {
                    var a = t.indexOf(e[r]);
                    if (i.prop("checked") && a < 0) {
                        t.push(e[r])
                    } else {
                        if (a > -1) {
                            t.splice(a, 1)
                        }
                    }
                }
                return t
            }
            ;
            t.prototype.setButtonImage = function(e, t) {
                e.toggleClass("is-filtered", t)
            }
            ;
            t.prototype.handleApply = function(e, t) {
                this.hideMenu();
                this.onFilterApplied.notify({
                    grid: this.grid,
                    column: t
                }, e, this);
                e.preventDefault();
                e.stopPropagation()
            }
            ;
            t.prototype.getFilterValues = function(e, t) {
                var i = new window["Set"];
                var r = [];
                for (var n = 0; n < e.getLength(); n++) {
                    var a = e.getItem(n)[t.field];
                    if (!i.has(a)) {
                        i.add(a);
                        r.push(a)
                    }
                }
                return r.sort()
            }
            ;
            t.prototype.containsFilter = function(e, t) {
                var i = this;
                if (t == null && t.length == 0)
                    return function(e) {
                        return true
                    }
                    ;
                var r = t.toString().toLowerCase();
                var n = e.formatter != null && this.options.useColumnFormatter;
                return function(t) {
                    var a;
                    if (n) {
                        a = i.getFilterText(e, t, false);
                        a = a.replace(/<[^>]+>/g, "")
                    } else {
                        a = !t ? "" : t
                    }
                    var o = a.toString().toLowerCase();
                    return o.indexOf(r) >= 0
                }
            }
            ;
            t.prototype.getFilterValuesByInput = function(e) {
                var t = e.data("column")
                  , i = this.containsFilter(t, e.val())
                  , r = this.grid.getData()
                  , n = new window["Set"]
                  , a = [];
                for (var o = 0; o < r.getLength(); o++) {
                    var l = r.getItem(o)[t.field];
                    if (!n.has(l) && i(l)) {
                        n.add(l);
                        a.push(l)
                    }
                }
                return a.sort()
            }
            ;
            t.prototype.getAllFilterValues = function(e, t) {
                var i = new window["Set"]
                  , r = [];
                for (var n = 0; n < e.length; n++) {
                    var a = e[n][t.field];
                    if (!i.has(a)) {
                        i.add(a);
                        r.push(a)
                    }
                }
                return r.sort()
            }
            ;
            t.prototype.handleMenuItemClick = function(e) {
                var t = $(this).data("command");
                var i = $(this).data("column");
                this.hideMenu();
                this.onCommand.notify({
                    grid: this,
                    column: i,
                    command: t
                }, e, this);
                e.preventDefault();
                e.stopPropagation()
            }
            ;
            return t
        }();
        t.HeaderFilters = i
    }
    )(t = e.Plugins || (e.Plugins = {}))
}
)(Slick || (Slick = {}));
