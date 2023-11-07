import{a as b,b as v}from"../../../_chunks/chunk-SST7RXIN.js";import{a as y,b as c,c as o,d}from"../../../_chunks/chunk-PHN3IF4W.js";import{a as s,c as a,d as n,f as g,g as h}from"../../../_chunks/chunk-BX2ZHUFS.js";var C=a(h(),1);var w=a(g(),1);var t=class extends b{constructor(){super(...arguments);this.form=new c(this.idPrefix)}getFormKey(){return c.formKey}getRowType(){return o}getService(){return d.baseUrl}afterLoadEntity(){super.afterLoadEntity(),this.form.Changes.value=t.getChangesInHtml(this.entity.Changes)}static getChangesInHtml(i){if(!i)return"";let u=JSON.parse(i),p="";for(let m in u){let f=u[m];p+=`
<tr>
    <td>${m}</td>
    <td>${f[0]}</td>
    <td>${f[1]}</td>
</tr>
`}return`
<table class="table table-bordered table-condensed table-striped">
    <tr>
        <th>Field</th>
        <th>Old Value</th>
        <th>New Value</th>
    </tr>
    ${p}
</table>
`}};s(t,"AuditLogDialog"),t=n([w.Decorators.registerClass("_Ext.AuditLogDialog")],t);var l=a(g(),1),F=a(h(),1);var r=class extends v{getColumnsKey(){return y.columnsKey}getDialogType(){return t}getRowDefinition(){return o}getIdProperty(){return o.idProperty}getService(){return d.baseUrl}constructor(e){super(e)}getButtons(){var e=super.getButtons();return e.splice(0,1),e}createQuickFilters(){super.createQuickFilters();let e=o.Fields,i=this.findQuickFilter(l.DateTimeEditor,e.ActionDate);i.valueAsDate=F.today()}};s(r,"AuditLogGrid"),r=n([l.Decorators.registerClass("_Ext.AuditLogGrid")],r);$(function(){(0,C.initFullHeightGridPage)(new r($("#GridDiv")).element)});
//# sourceMappingURL=AuditLogPage.js.map
