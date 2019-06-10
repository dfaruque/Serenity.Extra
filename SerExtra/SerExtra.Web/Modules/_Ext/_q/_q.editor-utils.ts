
namespace q {

    export function initDetailEditor(dialog: _Ext.DialogBase<any, any>, editor: _Ext.GridEditorBase<any>, options: ExtGridEditorOptions = {}): void {

        if (options.showCaption != true) {
            editor.element.siblings('.caption').hide();
        }
        if (options.hideToolbar == true) {
            editor.element.find('.grid-toolbar').hide()
        }
        if (options.isReadOnly == true) {
            editor.set_readOnly(options.isReadOnly);
        }
        editor.parentDialog = dialog;

        dialog.onAfterSetDialogSize = () => {
            let $gridContainer = editor.element.find('.grid-container');

            if (options.height) {
                editor.slickGrid.setOptions({ autoHeight: false });
                $gridContainer.height(options.height);

            } else {
                let top = $gridContainer.position().top;
                let height = dialog.element.innerHeight() - top - 40;

                if (height > 200)
                    $gridContainer.height(height);

            }

            if (options.width) {
                $gridContainer.width(options.width);

            }

            editor.slickGrid.resizeCanvas();

        }

    }

    export function setGridEditorHeight(editor: JQuery, heightInPx: number) {
        editor.css('height', heightInPx + 'px');
        editor.find('.grid-container')
            .css('height', (heightInPx - 25) + 'px')
            .height(heightInPx);
    }

    export function addNotificationIcon(editor: Serenity.StringEditor, isSuccess: boolean): void {

        let isAddOnInitialized = editor.element.data('isAddOnInitialized');

        if (isAddOnInitialized != true) {
            editor.element.after('<span class="text text-danger" style="padding:3px"><i class="fa fa-times"></i></span>');
            editor.element.data('isAddOnInitialized', true);
        }

        if (isSuccess == true) {
            editor.element.switchClass('bg-danger', 'bg-success')
                .siblings('.text').switchClass('text-danger', 'text-success')
                .children().switchClass('fa-times', 'fa-check');
        } else {
            editor.element.switchClass('bg-success', 'bg-danger')
                .siblings('.text').switchClass('text-success', 'text-danger')
                .children().switchClass('fa-check', 'fa-times');

        }
    }

    export function setEditorLabel(editor: Serenity.Widget<any>, value: string) {

        editor.element.siblings('label').text(value);
    }

    export function hideEditorLabel(editor: Serenity.Widget<any>) {

        editor.element.siblings('label').hide();
    }

    export function setEditorCategoryLabel(editor: Serenity.Widget<any>, value: string) {
        let categoryAnchor = editor.element.closest('.category').find('.category-anchor');
        categoryAnchor.text(value);

        let categoryAnchorName = categoryAnchor.attr('name');
        categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).text(value);
    }

    export function hideEditorCategory(editor: Serenity.Widget<any>, value: boolean = true) {
        if (value == true)
            editor.element.closest('.category').hide();
        else
            editor.element.closest('.category').show();

        let categoryAnchor = editor.element.closest('.category').find('.category-anchor');

        let categoryAnchorName = categoryAnchor.attr('name');
        if (value == true)
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).hide();
        else
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).show();
    }

    export function hideCategories(containerElement: JQuery, value: boolean = true) {
        if (value == true)
            containerElement.find('.category').hide();
        else
            containerElement.find('.category').show();

        let categoryAnchor = containerElement.find('.category').find('.category-anchor');

        let categoryAnchorName = categoryAnchor.attr('name');
        if (value == true)
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).hide();
        else
            categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).show();
    }

    export function hideFields(containerElement: JQuery, value: boolean = true) {
        if (value == true)
            containerElement.find('.field').hide();
        else
            containerElement.find('.field').show();
    }

    export function hideFieldsAndCategories(containerElement: JQuery, value: boolean = true) {
        hideFields(containerElement);
        hideCategories(containerElement);
    }

    export function hideField(editor: Serenity.Widget<any>, value: boolean = true) {
        if (editor) {
            if (value == true)
                editor.element.closest('.field').hide();
            else
                editor.element.closest('.field').show();
        }
    }
    export function showField(editor: Serenity.Widget<any>, value: boolean = true) {
        if (editor) {
            if (value == true)
                editor.element.closest('.field').show();
            else
                editor.element.closest('.field').hide();
        }
    }

    export function showAndEnableField(editor: Serenity.Widget<any>) {
        q.showField(editor);
        Serenity.EditorUtils.setReadOnly(editor, false);

    }
        
    export function showFieldAndCategory(editor: Serenity.Widget<any>, value: boolean = true) {
        showField(editor, value);
        if (value == true)
            hideEditorCategory(editor, false);
    }

    export function hideEditorTab(editor: Serenity.Widget<any>, value: boolean = true) {
        if (value) {
            let tabId = editor.element.closest('.tab-pane').hide().attr('id');
            let tabAnchor = editor.element.closest('.s-PropertyGrid').find(`a[href='#${tabId}']`);
            tabAnchor.closest('li').hide();
        } else {
            let tabId = editor.element.closest('.tab-pane').show().attr('id');
            let tabAnchor = editor.element.closest('.s-PropertyGrid').find(`a[href='#${tabId}']`);
            tabAnchor.closest('li').show();
        }
    }

    export function disableEditorTab(editor: Serenity.Widget<any>, value: boolean = true) {
        let tabId = editor.element.closest('.tab-pane').attr('id');

        let tabAnchor = editor.element.closest('.s-PropertyGrid').find(`a[href='#${tabId}']`);
        let tabLi = tabAnchor.closest('li');

        if (value == true) {
            tabAnchor.hide();
            tabLi.closest('li').addClass('disabled').prepend(`<a class="disabled">${tabAnchor.text()}</label>`);
        } else {
            tabAnchor.show();
            tabLi.closest('li').removeClass('disabled').find('.disabled').remove();

        }

    }

    export function readOnlyEditorTab(editor: Serenity.Widget<any>, value: boolean = true) {
        let $editors = editor.element.closest('.tab-pane').find('.editor');

        Serenity.EditorUtils.setReadonly($editors, value);
    }

    export function readOnlyEditorCategory(editor: Serenity.Widget<any>, value: boolean = true) {
        let $editors = editor.element.closest('.category').find('.editor');

        Serenity.EditorUtils.setReadonly($editors, value);
    }
    export function readonlyEditorCategory($editor: JQuery, value: boolean = true) {
        let $editors = $editor.closest('.category').find('.editor');
        Serenity.EditorUtils.setReadonly($editors, value);
    }

    export function readOnlyEditorPropertyGrid(editor: Serenity.Widget<any>, value: boolean = true) {
        let $editors = editor.element.closest('.s-PropertyGrid').find('.editor');
        Serenity.EditorUtils.setReadonly($editors, value);
    }
    export function readonlyEditorPropertyGrid($editor: JQuery, value: boolean = true) {
        let $editors = $editor.closest('.s-PropertyGrid').find('.editor');
        Serenity.EditorUtils.setReadonly($editors, value);
    }

    export function readOnlyEditor(editor: Serenity.Widget<any>, value: boolean = true) {
        Serenity.EditorUtils.setReadOnly(editor, value);
    }

    export function readonlyEditor($editor: JQuery, value: boolean = true) {
        Serenity.EditorUtils.setReadonly($editor, value);
    }

    export function moveEditorFromTab(editor: Serenity.Widget<any>, toElement: JQuery, isPrepend = false) {
        let fieldDiv = editor.element.closest('.field');

        if (isPrepend == true)
            fieldDiv.prependTo(toElement);
        else
            fieldDiv.appendTo(toElement);
    }

    export function moveEditorCategoryFromTab(editor: Serenity.Widget<any>, toElement: JQuery, isPrepend = false) {
        let fieldDiv = editor.element.closest('.field');
        let categoryDiv = editor.element.closest('.category');

        if (isPrepend == true)
            categoryDiv.prependTo(toElement);
        else
            categoryDiv.appendTo(toElement);

        //hide category navigation link
        let categoryAnchor = categoryDiv.find('.category-anchor');
        let categoryAnchorName = categoryAnchor.attr('name');
        categoryAnchor.closest('.s-PropertyGrid').find(`a[href='#${categoryAnchorName}']`).hide();

    }

    export function selectEditorTab(editor: Serenity.Widget<any>) {
        let tabId = editor.element.closest('.tab-pane').attr('id');

        let tabAnchor = editor.element.closest('.s-PropertyGrid').find(`a[href='#${tabId}']`);

        (tabAnchor as any).tab('show');
    }

    // for select2 lookup editor
    export function getSelectedRow<TRow>(e: JQueryEventObject) {
        let selectedItem: Serenity.Select2Item = (e as any).added;
        let selectedRow: TRow = selectedItem.source;

        return selectedRow;
    }

}
