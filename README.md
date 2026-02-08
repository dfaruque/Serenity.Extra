# Serenity.Extra

The name of the repo says that this is an EXTRA of my Beloved https://github.com/volkanceylan/Serenity platform

It is just some useful utilities and some extra functionalities like 
- Showing lookup text instead of ID value in the grid.
- Automatic width adjustment of grid columns.
- Added functionality to make a detail grid editable (inline)
- Added some useful functions in q (Not Q).
- Audit Log in a single Table and a nice viewer.
- Compare the database schema with the entity/row
- Generating database migration from entity/row
- Added some editors
   - Grid Item Picker Editor
   - YesNoEditor
   - JsonGridEditorBase

## How to use (for .net 10+)
1. Copy the **Modules/Common/Ext** folder from the **SerExtraNet10** project and place it accordingly.
2. Add following paths in tsconfig.json `"@ext/*": [ "./Modules/Common/Ext/*" ]` and `"@ServerTypes/*": [ "./Modules/ServerTypes/*" ]`
3. Add following line in Modules/Common/ScriptInit.ts `Q.Config.rootNamespaces.push('Ext');`
4. If you want to use code generator custom templates, then follow **sergen.json** file from **SerExtraNet10** project
5. See LanguageGrid.ts and LanguageDialog.ts for example.      

## How to use (for .net 8+)
1. Copy the **Modules/_Ext** folder from the **SerExtraNet8** project and place it accordingly.
3. Add following line in Modules/Common/ScriptInit.ts `Q.Config.rootNamespaces.push('_Ext');`
4. If you want to apply Serenity.Extra CSS, then you could copy then add a line in appsettings.bundles.json
`"~/Content/site/site.ext.css"`
5. If you want to use code generator custom templates, then follow **sergen.json** file from **SerExtraNet8** project
6. See LanguageGrid.ts and LanguageDialog.ts for example.

## How to use (for .net 6 with ES module)
1. Copy the **Modules/_Ext** folder from the **SerExtraESM** project and place it accordingly.
2. Copy the **wwwroot/lib/_Ext** folder from the **SerExtraESM** project
3. Add following line in Modules/Common/ScriptInit.ts `Q.Config.rootNamespaces.push('_Ext');`
4. If you want to apply Serenity.Extra CSS, then you could add a line in appsettings.bundles.json
`"~/lib/_Ext/ExtStyles.css"`
5. If you want to use code generator custom templates, then follow **sergen.json** file from **SerExtraESM** project
6. See LanguageGrid.ts and LanguageDialog.ts for example.

## How to use (for .net 5+)
1. Copy the **Modules/_Ext** folder from the SerExtraNet5 project and place it accordingly.
2. Copy the **wwwroot/Modules** folder from the SerExtraNet5 project
3. Add the following line in ScriptInitialization.ts `Q.Config.rootNamespaces.push('_Ext');`
4. If you want to apply Serenity.Extra css then you could add a line in appsettings.bundles.json
`"~/Modules/_Ext/ExtStyles.css"`

## How to use (for .net old framework)
1. Install the NuGet Package Serenity.Extra
4. If you want to apply Serenity.Extra CSS, then you could add a line in Content\site\CssBundles.json
`"~/Modules/_Ext/ExtStyles.css"`
5. Add [LookupScript("Administration.User")] on UserRow
6. Add the following line in ScriptInitialization.ts
```Q.Config.rootNamespaces.push('_Ext');```

Change Base/Super classes of Dialog.ts and Grid.ts using the following mappings

Serenity Default  |  _Ext
------------ | -------------
Serenity.EntityGrid | _Ext.GridBase
Serenity.EntityDialog | _Ext.DialogBase
Common.GridEditorBase | _Ext.GridEditorBase
Common.EditorDialogBase | _Ext.EditorDialogBase

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
 
 #### Online demo http://serenity-extra.herokuapp.com/
