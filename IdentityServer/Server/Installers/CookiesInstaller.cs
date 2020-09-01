using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Installers
{
    public class CookiesInstaller: IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureApplicationCookie(config =>
            {
                config.Cookie.Name = "Moneys.Identity";
                config.LoginPath = "/Auth/Login";
            });
        }
    }
}