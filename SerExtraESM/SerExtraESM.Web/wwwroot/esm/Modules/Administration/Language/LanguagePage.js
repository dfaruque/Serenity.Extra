import{a as s,b as m,c as e,d as i}from"../../../_chunks/chunk-MNHJHLJ6.js";import{a as o,b as c,c as n,e as l,f as u}from"../../../_chunks/chunk-K3EI6ARL.js";var d=c(l(),1);var a=c(u(),1);var r=class extends a.EntityDialog{constructor(){super(...arguments);this.form=new m(this.idPrefix)}getFormKey(){return m.formKey}getIdProperty(){return e.idProperty}getLocalTextPrefix(){return e.localTextPrefix}getNameProperty(){return e.nameProperty}getService(){return i.baseUrl}};o(r,"LanguageDialog"),r=n([a.Decorators.registerClass("SerExtraESM.Administration.LanguageDialog")],r);var p=c(u(),1);var t=class extends p.EntityGrid{useAsync(){return!0}getColumnsKey(){return s.columnsKey}getDialogType(){return r}getIdProperty(){return e.idProperty}getLocalTextPrefix(){return e.localTextPrefix}getService(){return i.baseUrl}afterInit(){super.afterInit()}getDefaultSortBy(){return[e.Fields.LanguageName]}};o(t,"LanguageGrid"),t=n([p.Decorators.registerClass("SerExtraESM.Administration.LanguageGrid")],t);$(function(){(0,d.initFullHeightGridPage)(new t($("#GridDiv")).element)});
//# sourceMappingURL=LanguagePage.js.map
