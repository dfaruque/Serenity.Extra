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

        editor = new editorType($input, args.column.sourceItem.editorParams);

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
        return (!(editor.value == "" && defaultValue == null)) && (editor.value != defaultValue);
    }

    this.validate = () => {
        return {
            valid: true,
            msg: null
        };
    }

    this.init();
}
