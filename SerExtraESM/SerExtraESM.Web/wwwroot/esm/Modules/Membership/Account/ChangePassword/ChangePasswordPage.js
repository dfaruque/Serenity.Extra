import{a as s}from"../../../../_chunks/chunk-DZEAZ5MW.js";import{a as r}from"../../../../_chunks/chunk-AXFO2ZGW.js";import{a as i,c as a,f as u,g as l}from"../../../../_chunks/chunk-FEDAVPE7.js";var n=a(l(),1),e=a(u(),1);$(function(){new t($("#ChangePasswordPanel"))});var t=class extends n.PropertyPanel{constructor(m){super(m);this.form=new s(this.idPrefix),this.form.NewPassword.addValidationRule(this.uniqueName,o=>{if(this.form.ConfirmPassword.value.length<7)return(0,e.format)(r.Validation.MinRequiredPasswordLength,7)}),this.form.ConfirmPassword.addValidationRule(this.uniqueName,o=>{if(this.form.ConfirmPassword.value!==this.form.NewPassword.value)return(0,e.localText)("Validation.PasswordConfirm")}),this.byId("SubmitButton").click(o=>{if(o.preventDefault(),!!this.validateForm()){var d=this.getSaveEntity();(0,e.serviceCall)({url:(0,e.resolveUrl)("~/Account/ChangePassword"),request:d,onSuccess:()=>{(0,e.information)(r.Forms.Membership.ChangePassword.Success,()=>{window.location.href=(0,e.resolveUrl)("~/")})}})}})}getFormKey(){return s.formKey}getTemplate(){return`<div class="s-Panel">
<h3 class="page-title mb-4 text-center">${(0,e.htmlEncode)((0,e.localText)("Forms.Membership.ChangePassword.FormTitle"))}</h3>
<form id="~_Form" action="">
    <div id="~_PropertyGrid"></div>
    <div class="px-field mt-4">
        <button id="~_SubmitButton" type="submit" class="btn btn-primary w-100">
            ${(0,e.htmlEncode)(r.Forms.Membership.ChangePassword.SubmitButton)}
        </button>
    </div>
</form>
</div>`}};i(t,"ChangePasswordPanel");
//# sourceMappingURL=ChangePasswordPage.js.map
