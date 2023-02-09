﻿using System.Collections.Generic;
using Serenity.ComponentModel;

namespace SerExtraESM.Administration.Forms
{
    [FormScript("Administration.User")]
    [BasedOnRow(typeof(UserRow), CheckNames = true)]
    public class UserForm
    {
        [LabelWidth(200, UntilNext = true)]
        public string Username { get; set; }
        public string DisplayName { get; set; }
        [EmailAddressEditor]
        public string Email { get; set; }
        [LookupEditor(typeof(RoleRow), Multiple = true)]
        public List<int> Roles { get; set; }
        public string UserImage { get; set; }
        [PasswordEditor, Required(true)]
        public string Password { get; set; }
        [PasswordEditor, OneWay, Required(true)]
        public string PasswordConfirm { get; set; }
        [OneWay]
        public string Source { get; set; }
    }
}