using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Installers
{
    public class ForwardedHeaderInstaller: IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
                {
                    services.Configure<ForwardedHeadersOptions>(options =>
                    {
                        options.ForwardLimit = 2;
                        options.KnownProxies.Add(IPAddress.Parse("127.0.10.1"));
                        options.ForwardedForHeaderName = "X-Forwarded-For-My-Custom-Header-Name";
                    });
                }
    }
}