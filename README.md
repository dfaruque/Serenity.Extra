# Serenity.Extra

Name of the repo says that this is an EXTRA of my Beloved https://github.com/volkanceylan/Serenity platform

It is just some useful utilities and some extra functionalities like 
- Showing lookup text instead of id value in grid.
- Automatic width adjustment of grid columns.
- Adding export report button automatically in grid if a report service method in defined.
- Added funtionality to make a detail grid editable (inline)
- Added some useful function in q (Not Q).
- Audit Log in a single Table and a nice viewer.
- Replace Row (useful for deleting a record and replace the dependants records with another record)
- Added some editors
   - Grid Item Picker Editor
   - AutoCompleteEditor
   - ColorEditor
   - DateTimePickerEditor
   - EmptyLookupEditor
   - StaticTextBlock
   
## How to use (for .net old framework)
1. Install NuGet Package Serenity.Extra
2. Include the following lines in _LayoutHead.cshtml
```C#
@Html.Stylesheet("~/Modules/_Ext/ExtStyles.css")
@Html.Script("~/Modules/_Ext/CustomSlickGridPlugin/slick.autocolumnsize.js")
@Html.Script("~/Modules/_Ext/Editors/slick.editors.js") 
```
3. Change Base/Super classes of Dialog.ts and Grid.ts using following mappings

Serenity Default  |  _Ext
------------ | -------------
Serenity.EntityGrid | _Ext.GridBase
Serenity.EntityDialog | _Ext.DialogBase
Common.GridEditorBase | _Ext.GridEditorBase
Common.EditorDialogBase | _Ext.EditorDialogBase

4. Add [LookupScript("Administration.User")] on UserRow
5. Add following line in ScriptInitialization.ts
```Q.Config.rootNamespaces.push('_Ext');```

## How to use (for .net core)
1. Copy the Modules/_Ext folder from the SerExtraCore project and place it accordingly.
2. Copy the wwwroot/Modules folder from the SerExtraCore project


## Examples

  #### To make a detail grid inline editable 
  add the following code to Grid.ts
  ```TypeScript
protected getSlickOptions() {
    let opt = super.getSlickOptions();
    opt.editable = true;
    return opt;
}
```
 #### To hide a field in a Dialog 
   use `q.hideField(this.form.SomeField)`.
   
 #### To disable a field in a Dialog 
   use `Serenity.EditorUtils.setReadOnly(this.form.SomeField, true);`
   
 #### To disable a Dialog 
   call `this.setReadOnly(true);` anywhere in your dialog.
   
 #### To access parent/master dialog from child/detail dialog
   Initialize detail editor by using `q.initDetailEditor(this, this.form.someDetailField)` in dialog's constructor() OR onDialogOpen() overload 
   
   Then you should be able to access parent dialog like `this.parentEditor.parentDialog`
   > Make sure that you have declared form in parent/master dialog as public
 
 ### Please explore the code to know more...
 
 #### Online demo (by @edwardch) https://serenity-extra.azurewebsites.net
