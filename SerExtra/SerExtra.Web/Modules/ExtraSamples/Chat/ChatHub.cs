using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SerExtra.Chatting
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.appendNewMessage(name, message);
        }
    }
}