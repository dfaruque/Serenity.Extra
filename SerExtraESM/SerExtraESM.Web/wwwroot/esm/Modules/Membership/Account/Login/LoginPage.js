import{c}from"../../../../_chunks/chunk-DZEAZ5MW.js";import{a as s}from"../../../../_chunks/chunk-AXFO2ZGW.js";import{a as l,c as d,f as m,g}from"../../../../_chunks/chunk-FEDAVPE7.js";var u=d(g(),1),r=d(m(),1);$(function(){var n,t,o;var i=new a($("#LoginPanel")).init();i.element.find(".forgot-password").appendTo(".field.Password"),(n=document.getElementById("IsPublicDemo"))!=null&&n.value&&(i.byId("Username").val("admin").attr("placeholder","admin"),i.byId("Password").val("serenity").attr("placeholder","serenity")),(t=document.getElementById("Activated"))!=null&&t.value&&(i.byId("Username").val((o=document.getElementById("Activated"))==null?void 0:o.value),i.byId("Password").focus())});var a=class extends u.PropertyPanel{getFormKey(){return c.formKey}constructor(n){super(n),this.byId("LoginButton").click(t=>{if(t.preventDefault(),!!this.validateForm()){var o=this.getSaveEntity();(0,r.serviceCall)({url:(0,r.resolveUrl)("~/Account/Login"),request:o,onSuccess:()=>{this.redirectToReturnUrl()},onError:e=>{if(e!=null&&e.Error!=null&&e.Error.Code=="RedirectUserTo"){window.location.href=e.Error.Arguments;return}if(e!=null&&e.Error!=null&&!(0,r.isEmptyOrNull)(e.Error.Message)){(0,r.notifyError)(e.Error.Message),$("#Password").focus();return}r.ErrorHandling.showServiceError(e.Error)}})}})}redirectToReturnUrl(){var n=(0,r.parseQueryString)(),t=n.returnUrl||n.ReturnUrl;if(t){var o=window.location.hash;o!=null&&o!="#"&&(t+=o),window.location.href=t}else window.location.href=(0,r.resolveUrl)("~/")}getTemplate(){return`
<h2 class="text-center p-4">
    <img src="${(0,r.resolveUrl)("~/Content/site/images/serenity-logo-w-128.png")}"
        class="rounded-circle p-1" style="background-color: var(--s-sidebar-band-bg)"
        width="50" height="50" /> SerExtraESM
</h2>

<div class="s-Panel p-4">
    <h5 class="text-center my-4">${(0,r.htmlEncode)(s.Forms.Membership.Login.LoginToYourAccount)}</h5>
    <form id="~_Form" action="">
        <div id="~_PropertyGrid"></div>
        <div class="px-field">
            <a class="float-end text-decoration-none" href="${(0,r.resolveUrl)("~/Account/ForgotPassword")}">
                ${(0,r.htmlEncode)(s.Forms.Membership.Login.ForgotPassword)}
            </a>
        </div>
        <div class="px-field">
            <button id="~_LoginButton" type="submit" class="btn btn-primary my-3 w-100">
                ${(0,r.htmlEncode)(s.Forms.Membership.Login.SignInButton)}
            </button>
        </div>
    </form>
</div>

<div class="text-center mt-2">
    <a class="text-decoration-none" href="${(0,r.resolveUrl)("~/Account/SignUp")}">${(0,r.htmlEncode)((0,r.localText)("Forms.Membership.Login.SignUpButton"))}</a>
</div>   
`}};l(a,"LoginPanel");
//# sourceMappingURL=LoginPage.js.map
