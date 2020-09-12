using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Server.Options;

namespace Server.Installers
{
    public class DependencyInstaller: IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            var urls = new ApplicationUrls();
            var urlsFromConfig = configuration.GetSection("ApplicationUrls");
            urlsFromConfig.Bind(urls);

            services.AddSingleton(urls);
        }
    }
}