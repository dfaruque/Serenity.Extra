/***
 * Contains basic SlickGrid editors.
 * @module Editors
 * @namespace Slick
 */

(function ($) {
    // register namespace
    $.extend(true, window, {
        "Slick": {
            "Editors": {
                "Text": TextEditor,
                "Select2": Select2Editor,
                "Integer": IntegerEditor,
                "Float": FloatEditor,
                "Date": DateEditor,
                "YesNoSelect": YesNoSelectEditor,
                "Checkbox": CheckboxEditor,
                "PercentComplete": PercentCompleteEditor,
                "LongText": LongTextEditor,
                "TextArea": TextAreaEditor
            }
        }
    });
    //-------------------------onChange----------------------------
    function onChange(e, args) {
        var input = $(e.target);
        var val = Q.coalesce(Q.trimToNull(input.val()), '0');

        if (args.column.onChange) {
            setTimeout(() => {
                args.column.onChange(e, args.item, val);
            }, 1);
            //args.grid.render();
        }
    }
    //-------------------------Select2----------------------------
    function PopulateSelect(select, dataSource, addBlank) {
        var index, len, newOption;
        if (addBlank) { select.appendChild(new Option('', '')); }
        $.each(dataSource, function (value, text) {
            newOption = new Option(text, value);
            select.appendChild(newOption);
        });
    };
    function PopulateSelectWithSerenityLookup(select, lookup, addBlank) {
        var index, len, newOption;
        if (addBlank) { select.appendChild(new Option('', '')); }
        $.each(lookup.items, function (key, value) {
            newOption = new Option(value[lookup.textField], value[lookup.idField]);
            select.appendChild(newOption);
        });
    };
    function PopulateSelectWithSerenityEnum(select, enumKey, addBlank) {
        var index, len, newOption;
        if (addBlank) { select.appendChild(new Option('', '')); }

        var enumType = Serenity.EnumTypeRegistry.get(enumKey);
        if (ss.isValue(enumType)) {
            var enumKeyAttr = ss.getAttributes(enumType, Serenity.EnumKeyAttribute, false);
            if (enumKeyAttr.length > 0) {
                enumKey = enumKeyAttr[0].value;
            }
        }
        var values = ss.Enum.getValues(enumType);
        for (var i = 0; i < values.length; i++) {
            var value = Q.toId(values[i]);

            var text = q.getEnumText(enumKey, Q.toId(value));

            newOption = new Option(text, value);
            select.appendChild(newOption);
        }
    };
    function Select2Editor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        var calendarOpen = false;
        this.keyCaptureList = [Slick.keyCode.UP, Slick.keyCode.DOWN, Slick.keyCode.ENTER];
        this.init = function () {
            $input = $('<select></select>');
            $input.width(args.container.clientWidth + 3);
            //PopulateSelect($input[0], args.column.dataSource, true);
            if (args.column.lookup) {
                PopulateSelectWithSerenityLookup($input[0], args.column.lookup, true);
            } else if (args.column.sourceItem) {
                if (args.column.sourceItem.editorParams) {
                    var enumKey = args.column.sourceItem.editorParams.enumKey;
                    if (enumKey) {
                        PopulateSelectWithSerenityEnum($input[0], enumKey, true);
                    }

                }
            }

            $input.appendTo(args.container);
            $input.focus().select();

            $input.bind('change', function (e) {
                onChange(e, args);
            });


            $input.select2({
                placeholder: '-',
                allowClear: true
            });
        };
        this.destroy = function () {
            $input.select2('destroy');
            $input.remove();
        };
        this.show = function () {
        };
        this.hide = function () {
            $input.select2('results_hide');
        };
        this.position = function (position) {
        };
        this.focus = function () {
            $input.select2('input_focus');
        };
        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.trigger("change.select2");
        };
        this.serializeValue = function () {
            return $input.val();
        };
        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };
        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };
        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };
        this.init();
    }

    function Select2Formatter(row, cell, value, columnDef, dataContext) {
        return columnDef.dataSource[value] || '-';
    }
    //-------------------------End Select2----------------------------
    function TextEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />")
                .appendTo(args.container)
                .bind("keydown.nav", function (e) {
                    if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                        e.stopImmediatePropagation();
                    }
                })
                .focus()
                .select();

            $input.bind('change', function (e) {
                onChange(e, args);
            });
        };

        this.destroy = function () {
            $input.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.getValue = function () {
            return $input.val();
        };

        this.setValue = function (val) {
            $input.val(val);
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field] || "";
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            return $input.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val());
                if (!validationResults.valid) {
                    return validationResults;
                }
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function IntegerEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />");

            $input.bind("keydown.nav", function (e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });

            $input.appendTo(args.container);
            $input.focus().select();

            $input.bind('change', function (e) {
                onChange(e, args);
            });
        };

        this.destroy = function () {
            $input.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            return parseInt($input.val(), 10) || 0;
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            if (isNaN($input.val())) {
                return {
                    valid: false,
                    msg: "Please enter a valid integer"
                };
            }

            if (args.column.validator) {
                var validationResults = args.column.validator($input.val());
                if (!validationResults.valid) {
                    return validationResults;
                }
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function FloatEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />");

            $input.bind("keydown.nav", function (e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            });

            $input.appendTo(args.container);
            $input.focus().select();

            $input.bind('change', function (e) {
                onChange(e, args);
                e.preventDefault();
            });

        };

        this.destroy = function () {
            $input.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        function getDecimalPlaces() {
            // returns the number of fixed decimal places or null
            var rtn = args.column.editorFixedDecimalPlaces;
            if (typeof rtn == 'undefined') {
                rtn = FloatEditor.DefaultDecimalPlaces;
            }
            return (!rtn && rtn !== 0 ? null : rtn);
        }

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];

            var decPlaces = getDecimalPlaces();
            if (decPlaces !== null
                && (defaultValue || defaultValue === 0)
                && defaultValue.toFixed) {
                defaultValue = defaultValue.toFixed(decPlaces);
            }

            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            var rtn = parseFloat($input.val()) || 0;

            var decPlaces = getDecimalPlaces();
            if (decPlaces !== null
                && (rtn || rtn === 0)
                && rtn.toFixed) {
                rtn = parseFloat(rtn.toFixed(decPlaces));
            }

            return rtn;
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            if (isNaN($input.val())) {
                return {
                    valid: false,
                    msg: "Please enter a valid number"
                };
            }

            if (args.column.validator) {
                var validationResults = args.column.validator($input.val());
                if (!validationResults.valid) {
                    return validationResults;
                }
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    FloatEditor.DefaultDecimalPlaces = null;

    function DateEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;
        var calendarOpen = false;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-text' />");
            $input.appendTo(args.container);
            $input.focus().select();
            $input.datepicker({
                showOn: "button",
                buttonImageOnly: true,
                buttonImage: Q.resolveUrl("~/Content/serenity/images/calendar-blue.png"),
                beforeShow: function () {
                    calendarOpen = true
                },
                onClose: function () {
                    calendarOpen = false
                },
                onSelect: function (dateText) {
                    if ((!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue)) {
                        if (args.column.onChange) {
                            args.column.onChange();
                        }
                    }
                }
            }).on("change", function () {
                if (args.column.onChange) {
                    args.column.onChange();
                }

            });

            $input.width($input.width() - 18);

            if (args.column.seletedDate) {
                //$input.datepicker({ defaultDate: new Date() });
                $input.datepicker("setDate", args.column.seletedDate);
            }
        };

        this.destroy = function () {
            $.datepicker.dpDiv.stop(true, true);
            $input.datepicker("hide");
            $input.datepicker("destroy");
            $input.remove();
        };

        this.show = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).show();
            }
        };

        this.hide = function () {
            if (calendarOpen) {
                $.datepicker.dpDiv.stop(true, true).hide();
            }
        };

        this.position = function (position) {
            if (!calendarOpen) {
                return;
            }
            $.datepicker.dpDiv
                .css("top", position.top + 30)
                .css("left", position.left);
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field];
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.datepicker('setDate', Q.parseISODateTime(defaultValue));
            $input.select();
        };

        this.serializeValue = function () {
            var d = $input.datepicker('getDate');
            if (d) {
                return Q.formatDate(d, 'yyyy-MM-ddTHH:mm');
            } else return null;
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val());
                if (!validationResults.valid) {
                    return validationResults;
                }
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function YesNoSelectEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $select = $("<SELECT tabIndex='0' class='editor-yesno'><OPTION value='yes'>Yes</OPTION><OPTION value='no'>No</OPTION></SELECT>");
            $select.appendTo(args.container);
            $select.focus();

            $select.bind('change', function (e) {
                onChange(e, args);
            });

        };

        this.destroy = function () {
            $select.remove();
        };

        this.focus = function () {
            $select.focus();
        };

        this.loadValue = function (item) {
            $select.val((defaultValue = item[args.column.field]) ? "yes" : "no");
            $select.select();
        };

        this.serializeValue = function () {
            return ($select.val() == "yes");
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return ($select.val() != defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function CheckboxEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=checkbox value='true' class='editor-checkbox' hideFocus>");
            $input.appendTo(args.container);
            $input.focus();

            $input.bind('change', function (e) {
                onChange(e, args);
            });

        };

        this.destroy = function () {
            $input.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            defaultValue = !!item[args.column.field];
            if (defaultValue) {
                $input.prop('checked', true);
            } else {
                $input.prop('checked', false);
            }
        };

        this.serializeValue = function () {
            return $input.prop('checked');
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (this.serializeValue() !== defaultValue);
        };

        this.validate = function () {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function PercentCompleteEditor(args) {
        var $input, $picker;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<INPUT type=text class='editor-percentcomplete' />");
            $input.width($(args.container).innerWidth() - 25);
            $input.appendTo(args.container);

            $picker = $("<div class='editor-percentcomplete-picker' />").appendTo(args.container);
            $picker.append("<div class='editor-percentcomplete-helper'><div class='editor-percentcomplete-wrapper'><div class='editor-percentcomplete-slider' /><div class='editor-percentcomplete-buttons' /></div></div>");

            $picker.find(".editor-percentcomplete-buttons").append("<button val=0>Not started</button><br/><button val=50>In Progress</button><br/><button val=100>Complete</button>");

            $input.focus().select();

            $picker.find(".editor-percentcomplete-slider").slider({
                orientation: "vertical",
                range: "min",
                value: defaultValue,
                slide: function (event, ui) {
                    $input.val(ui.value)
                }
            });

            $picker.find(".editor-percentcomplete-buttons button").bind("click", function (e) {
                $input.val($(this).attr("val"));
                $picker.find(".editor-percentcomplete-slider").slider("value", $(this).attr("val"));
            })
        };

        this.destroy = function () {
            $input.remove();
            $picker.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
            $input.select();
        };

        this.serializeValue = function () {
            return parseInt($input.val(), 10) || 0;
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ((parseInt($input.val(), 10) || 0) != defaultValue);
        };

        this.validate = function () {
            if (isNaN(parseInt($input.val(), 10))) {
                return {
                    valid: false,
                    msg: "Please enter a valid positive number"
                };
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    /*
     * An example of a "detached" editor.
     * The UI is added onto document BODY and .position(), .show() and .hide() are implemented.
     * KeyDown events are also handled to provide handling for Tab, Shift-Tab, Esc and Ctrl-Enter.
     */
    function LongTextEditor(args) {
        var $input, $wrapper;
        var defaultValue;
        var scope = this;

        this.init = function () {
            var $container = $("body");

            $wrapper = $("<DIV style='z-index:10000;position:absolute;background:white;padding:5px;border:3px solid gray; -moz-border-radius:10px; border-radius:10px;'/>")
                .appendTo($container);

            $input = $("<TEXTAREA hidefocus rows=5 style='backround:white;width:250px;height:80px;border:0;outline:0'>")
                .appendTo($wrapper);

            $("<DIV style='text-align:right'><BUTTON>Save</BUTTON><BUTTON>Cancel</BUTTON></DIV>")
                .appendTo($wrapper);

            $wrapper.find("button:first").bind("click", this.save);
            $wrapper.find("button:last").bind("click", this.cancel);
            $input.bind("keydown", this.handleKeyDown);

            scope.position(args.position);
            $input.focus().select();

            $input.bind('change', function (e) {
                onChange(e, args);
            });

        };

        this.handleKeyDown = function (e) {
            if (e.which == $.ui.keyCode.ENTER && e.ctrlKey) {
                scope.save();
            } else if (e.which == $.ui.keyCode.ESCAPE) {
                e.preventDefault();
                scope.cancel();
            } else if (e.which == $.ui.keyCode.TAB && e.shiftKey) {
                e.preventDefault();
                args.grid.navigatePrev();
            } else if (e.which == $.ui.keyCode.TAB) {
                e.preventDefault();
                args.grid.navigateNext();
            }
        };

        this.save = function () {
            args.commitChanges();
        };

        this.cancel = function () {
            $input.val(defaultValue);
            args.cancelChanges();
        };

        this.hide = function () {
            $wrapper.hide();
        };

        this.show = function () {
            $wrapper.show();
        };

        this.position = function (position) {
            $wrapper
                .css("top", position.top - 5)
                .css("left", position.left - 5)
        };

        this.destroy = function () {
            $wrapper.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.loadValue = function (item) {
            $input.val(defaultValue = item[args.column.field]);
            $input.select();
        };

        this.serializeValue = function () {
            return $input.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val());
                if (!validationResults.valid) {
                    return validationResults;
                }
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

    function TextAreaEditor(args) {
        var $input;
        var defaultValue;
        var scope = this;

        this.init = function () {
            $input = $("<textarea style='width:100%; border-radius:0px !important; border:1px solid #CCCCCC !important; border-left:5px solid #CCCCCC !important;'  maxlength='255' class='editor-text' />")
                .appendTo(args.container)
                .bind("keydown.nav", function (e) {
                    if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                        e.stopImmediatePropagation();
                    }
                })
                .focus()
                .select();

            $input.bind('change', function (e) {
                onChange(e, args);
            });
        };

        this.destroy = function () {
            $input.remove();
        };

        this.focus = function () {
            $input.focus();
        };

        this.getValue = function () {
            return $input.val();
        };

        this.setValue = function (val) {
            $input.val(val);
        };

        this.loadValue = function (item) {
            defaultValue = item[args.column.field] || "";
            $input.val(defaultValue);
            $input[0].defaultValue = defaultValue;
            $input.select();
        };

        this.serializeValue = function () {
            return $input.val();
        };

        this.applyValue = function (item, state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function () {
            return (!($input.val() == "" && defaultValue == null)) && ($input.val() != defaultValue);
        };

        this.validate = function () {
            if (args.column.validator) {
                var validationResults = args.column.validator($input.val());
                if (!validationResults.valid) {
                    return validationResults;
                }
            }

            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }

})(jQuery);

// Inline serenity editors for slikgrid
function SerenityInlineEditor(args) {
    var $input;
    var editor;
    var defaultValue;
    var scope = this;

    this.init = () => {
        if (args.column.sourceItem.editorType === undefined)
            args.column.sourceItem.editorType = 'String';
        var editorType = Serenity.EditorTypeRegistry.get(args.column.sourceItem.editorType);

        $input = $("<input />")
            .appendTo(args.container)
            .addClass('editor')
            .bind("keydown.nav", function (e) {
                if (e.keyCode === $.ui.keyCode.LEFT || e.keyCode === $.ui.keyCode.RIGHT) {
                    e.stopImmediatePropagation();
                }
            })
            .focus()
            .select();

        if (args.column.sourceItem.editorType == 'Boolean')
            $input.attr('type', 'checkbox');

        let editorParams = Q.deepClone(args.column.sourceItem.editorParams);
        if (editorParams.cascadeFrom != undefined) {
            let cascadeFrom = editorParams.cascadeFrom;
            editorParams.cascadeField = editorParams.cascadeField || cascadeFrom;
            editorParams.cascadeFrom = null;
            editorParams.cascadeValue = args.item[cascadeFrom]
        }

        editor = new editorType($input, editorParams);

        if (args.column.sourceItem.editorType != 'Boolean')
            $input.addClass('editor-text');
    }

    this.destroy = () => {
        $input.removeData();
        $input.remove();
    }

    this.focus = () => {
        $input.focus();
    }

    this.getValue = () => {
        var v = editor.value;
        if (args.column.sourceItem.editorType == 'String' ||
            args.column.sourceItem.editorType == 'Date')
            return v;

        if (isNaN(v))
            return "";
        return v;
    }

    this.setValue = (val) => {
        editor.value = val;
    }

    this.loadValue = (item) => {
        defaultValue = item[args.column.sourceItem.name] || "";
        editor.value = defaultValue;
        $input.defaultValue = defaultValue;
        $input.select();
    }

    this.serializeValue = () => {
        var v = editor.value;

        if (args.column.sourceItem.editorType == 'String' ||
            args.column.sourceItem.editorType == 'Date')
            return v;

        if (isNaN(v))
            return "";
        return v;
    }

    this.applyValue = (item, state) => {
        item[args.column.field] = state;
    }

    this.isValueChanged = () => {
        var isValueEmpty = editor.value == "" || editor.value == null || editor.value == undefined;
        var isDefaultValueEmpty = defaultValue == "" || defaultValue == null || defaultValue == undefined;
        return (!(isValueEmpty && isDefaultValueEmpty)) && (editor.value != defaultValue);
    }

    this.validate = () => {
        return {
            valid: true,
            msg: null
        };
    }

    this.init();
}
