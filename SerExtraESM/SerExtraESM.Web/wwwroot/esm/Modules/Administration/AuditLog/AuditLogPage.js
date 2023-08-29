import{a as y,b}from"../../../_chunks/chunk-LKL4UBNM.js";import{a as u,b as o,c as l}from"../../../_chunks/chunk-PEBSLWIM.js";import{a as s,c as a,d,f,g as h}from"../../../_chunks/chunk-FEDAVPE7.js";var F=a(f(),1);var v=a(h(),1);var t=class extends y{constructor(){super(...arguments);this.form=new u(this.idPrefix)}getFormKey(){return u.formKey}getRowType(){return o}getService(){return l.baseUrl}afterLoadEntity(){super.afterLoadEntity(),this.form.Changes.value=t.getChangesInHtml(this.entity.Changes)}static getChangesInHtml(i){if(!i)return"";let c=JSON.parse(i),p="";for(let m in c){let g=c[m];p+=`
<tr>
    <td>${m}</td>
    <td>${g[0]}</td>
    <td>${g[1]}</td>
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
`}};s(t,"AuditLogDialog"),t=d([v.Decorators.registerClass("_Ext.AuditLogDialog")],t);var n=a(h(),1),w=a(f(),1);var r=class extends b{getColumnsKey(){return"_Ext.AuditLog"}getDialogType(){return t}getRowType(){return o}getService(){return l.baseUrl}constructor(e){super(e)}getButtons(){var e=super.getButtons();return e.splice(0,1),e}createQuickFilters(){super.createQuickFilters();let e=o.Fields,i=this.findQuickFilter(n.DateTimeEditor,e.ActionDate);i.valueAsDate=w.today()}};s(r,"AuditLogGrid"),r=d([n.Decorators.registerClass("_Ext.AuditLogGrid")],r);$(function(){(0,F.initFullHeightGridPage)(new r($("#GridDiv")).element)});
//# sourceMappingURL=AuditLogPage.js.map
