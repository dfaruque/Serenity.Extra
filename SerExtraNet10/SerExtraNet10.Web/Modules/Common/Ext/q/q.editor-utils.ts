import { EditorUtils, Fluent, Widget } from "@serenity-is/corelib"
import { DialogBase } from "../Bases/DialogBase"
import { GridEditorBase } from "../Editors/GridEditorBase"

export function initDetailEditor(dialog: DialogBase<any, any>, editor: GridEditorBase<any>, options: ExtGridEditorOptions = {}): void {

    if (options.showCaption != true) {
        editor.element.prevSibling('.caption').hide();
    }
    if (options.hideToolbar == true) {
        editor.element.findFirst('.grid-toolbar').hide()
    }
    if (options.isReadOnly == true) {
        editor.set_readOnly(options.isReadOnly);
    }
    editor.parentDialog = dialog;
}

export function setEditorLabel(editor: Widget<any>, value: string) {

    editor.element.prevSibling('label').text(value);
}

export function hideEditorLabel(editor: Widget<any>) {

    editor.element.prevSibling('label').hide();
}

export function setEditorCategoryLabel(editor: Widget<any>, value: string) {
    let categoryAnchor = editor.element.closest('.category').findFirst('.category-anchor');
    categoryAnchor.text(value);

    let categoryAnchorName = categoryAnchor.attr('name');
    categoryAnchor.closest('.s-PropertyGrid').findFirst(`a[href='#${categoryAnchorName}']`).text(value);
}

export function hideEditorCategory(editor: Widget<any>, value: boolean = true, clearEditorValue: boolean = true) {
    if (value == true) {
        editor.element.closest('.category').hide();

        if (clearEditorValue) {
            editor.element.closest('.category').findFirst('input.editor').val('');
        }
    }
    else
        editor.element.closest('.category').show();

    let categoryAnchor = editor.element.closest('.category').findFirst('.category-anchor');

    let categoryAnchorName = categoryAnchor.attr('name');
    if (value == true)
        categoryAnchor.closest('.s-PropertyGrid').findFirst(`a[href='#${categoryAnchorName}']`).hide()
            .nextSibling('.separator').hide();
    else
        categoryAnchor.closest('.s-PropertyGrid').findFirst(`a[href='#${categoryAnchorName}']`).show()
            .nextSibling('.separator').show();;
}

export function hideCategories(containerElement: Fluent, value: boolean = true) {
    if (value == true)
        containerElement.findFirst('.category').hide();
    else
        containerElement.findFirst('.category').show();

    let categoryAnchor = containerElement.findFirst('.category').findFirst('.category-anchor');

    let categoryAnchorName = categoryAnchor.attr('name');
    if (value == true)
        categoryAnchor.closest('.s-PropertyGrid').findFirst(`a[href='#${categoryAnchorName}']`).hide();
    else
        categoryAnchor.closest('.s-PropertyGrid').findFirst(`a[href='#${categoryAnchorName}']`).show();
}

export function hideFields(containerElement: Fluent, value: boolean = true) {
    if (value == true)
        containerElement.findFirst('.field').hide();
    else
        containerElement.findFirst('.field').show();
}

export function hideFieldsAndCategories(containerElement: Fluent, value: boolean = true) {
    hideFields(containerElement);
    hideCategories(containerElement);
}

export function hideField(editor: Widget<any>, value: boolean = true, clearEditorValue: boolean = true) {
    if (editor) {
        if (value == true) {
            editor.element.closest('.field').hide();
            EditorUtils.setValue(editor, '');
        }
        else
            editor.element.closest('.field').show();
    }
}
export function showField(editor: Widget<any>, value: boolean = true) {
    if (editor) {
        if (value == true)
            editor.element.closest('.field').show();
        else
            editor.element.closest('.field').hide();
    }
}

export function showAndEnableField(editor: Widget<any>) {
    showField(editor);
    EditorUtils.setReadOnly(editor, false);

}

export function showFieldAndCategory(editor: Widget<any>, value: boolean = true) {
    showField(editor, value);
    if (value == true)
        hideEditorCategory(editor, false);
}

export function hideEditorTab(editor: Widget<any>, value: boolean = true) {
    if (value) {
        let tabId = editor.element.closest('.tab-pane').hide().attr('id');
        let tabAnchor = editor.element.closest('.s-PropertyGrid').findFirst(`a[href='#${tabId}']`);
        tabAnchor.closest('li').hide();
    } else {
        let tabId = editor.element.closest('.tab-pane').show().attr('id');
        let tabAnchor = editor.element.closest('.s-PropertyGrid').findFirst(`a[href='#${tabId}']`);
        tabAnchor.closest('li').show();
    }
}

export function disableEditorTab(editor: Widget<any>, value: boolean = true) {
    let tabId = editor.element.closest('.tab-pane').attr('id');

    let tabAnchor = editor.element.closest('.s-PropertyGrid').findFirst(`a[href='#${tabId}']`);
    let tabLi = tabAnchor.closest('li');

    if (value == true) {
        tabAnchor.hide();
        tabLi.closest('li').addClass('disabled').prepend(`<a class="disabled">${tabAnchor.text()}</label>`);
    } else {
        tabAnchor.show();
        tabLi.closest('li').removeClass('disabled').findFirst('.disabled').remove();

    }

}

export function readOnlyEditorTab(editor: Widget<any>, value: boolean = true) {
    let $editors = editor.element.closest('.tab-pane').findAll('.editor');

    EditorUtils.setReadonly($editors, value);
}

export function readOnlyEditorCategory(editor: Widget<any>, value: boolean = true) {
    let $editors = editor.element.closest('.category').findAll('.editor');
    EditorUtils.setReadonly($editors, value);
}
export function readonlyEditorCategory($editor: Fluent, value: boolean = true) {
    let $editors = $editor.closest('.category').findAll('.editor');
    EditorUtils.setReadonly($editors, value);
}

export function readOnlyEditorPropertyGrid(editor: Widget<any>, value: boolean = true) {
    let $propertyGrid = editor.element.closest('.s-PropertyGrid');
    let $editors = $propertyGrid.findAll('.editor');
    EditorUtils.setReadonly($editors, value);
    EditorUtils.setContainerReadOnly($propertyGrid, value);
}
export function readonlyEditorPropertyGrid($editor: Fluent, value: boolean = true) {
    let $propertyGrid = $editor.closest('.s-PropertyGrid');
    let $editors = $propertyGrid.findAll('.editor');
    EditorUtils.setReadonly($editors, value);
    EditorUtils.setContainerReadOnly($propertyGrid, value);
}

export function readOnlyEditor(editor: Widget<any>, value: boolean = true) {
    EditorUtils.setReadOnly(editor, value);
}

export function readonlyEditor($editor: Fluent, value: boolean = true) {
    EditorUtils.setReadonly($editor, value);
}

export function moveEditorFromTab(editor: Widget<any>, toElement: Fluent, isPrepend = false) {
    let fieldDiv = editor.element.closest('.field');

    if (isPrepend == true)
        fieldDiv.prependTo(toElement);
    else
        fieldDiv.appendTo(toElement);
}

export function moveEditorCategoryFromTab(editor: Widget<any>, toElement: Fluent, isPrepend = false) {
    let fieldDiv = editor.element.closest('.field');
    let categoryDiv = editor.element.closest('.category');

    if (isPrepend == true)
        categoryDiv.prependTo(toElement);
    else
        categoryDiv.appendTo(toElement);

    //hide category navigation link
    let categoryAnchor = categoryDiv.findFirst('.category-anchor');
    let categoryAnchorName = categoryAnchor.attr('name');
    categoryAnchor.closest('.s-PropertyGrid').findFirst(`a[href='#${categoryAnchorName}']`).hide();

}

export function selectEditorTab(editor: Widget<any>) {
    let tabId = editor.element.closest('.tab-pane').attr('id');

    let tabAnchor = editor.element.closest('.s-PropertyGrid').findFirst(`a[href='#${tabId}']`);

    (tabAnchor as any).tab('show');
}
