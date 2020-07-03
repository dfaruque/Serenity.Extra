using Owin;
using Microsoft.Owin;

[assembly: OwinStartup(typeof(SerExtra.Chatting.ChatStartup))]

namespace SerExtra.Chatting
{
    public class ChatStartup
    {
        public void Configuration(IAppBuilder app)
        {
            // Any connection or hub wire up and configuration should go here app.MapSignalR();   
            app.MapSignalR();
        }
    }
}
