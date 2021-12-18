using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Events4All.Startup))]
namespace Events4All
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
