# Serenity.Extra

Name of the repo says that this is an EXTRA to My Beloved https://github.com/volkanceylan/Serenity platform

It is just some useful utilities and some extra functionality like 
- Showing lookup text instead of id value in grid etc.
- Adding export report button automatically in grid if a report service method in defined.
- Added funtionality to make a detail grid editable (inline)
- Added some useful function in q (Not Q).

## How to use
- Install NuGet Package Serenity.Extra
- Include the following lines to _LayoutHead.cshtml
  ```@Html.Stylesheet("~/Modules/_Ext/ExtStyles.css")
  @Html.Script("~/Modules/_Ext/CustomSlickGridPlugin/slick.autocolumnsize.js")
  @Html.Script("~/Modules/_Ext/Editors/slick.editors.js") 
  ```

- Change Base/Super classes of Dialog.ts and Grid.ts using following mappings
  `Serenity.EntityGrid` -> `_Ext.GridBase`
  `Serenity.EntityDialog` -> `_Ext.DialogBase`
  `Common.GridEditorBase` -> `_Ext.GridEditorBase`
  `Common.EditorDialogBase` -> `_Ext.EditorDialogBase`

## Examples
  - To set form fields width simply use `[CssClass("width6")]` on top of Form.cs properties.
  here "width6" is similar to col-6 in bootstrap

  - To make a detail grid inline editable 
  add the following code to Grid.ts
  ```
          protected getSlickOptions() {
            let opt = super.getSlickOptions();
            opt.editable = true;
            return opt;
        }
```
 - To hide a field in a Dialog use `_Ext.q.hideField(this.form.SomeField)`.
 - To access parent/master dialog from child/detail dialog
   
   Initialize detail editor by using `_Ext.q.initDetailEditor(this, this.form.someDetailField)`
   Then you should be able to access parent dialog like `this.parentEditor.parentDialog`
 
 ### Please explore the codes to know more...
