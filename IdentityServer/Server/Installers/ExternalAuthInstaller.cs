using IdentityServer4;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Installers
{
    public class ExternalAuthInstaller : IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            services.AddAuthentication()
                .AddGoogle(options =>
                {
                    options.ClientId =
                        "830770546293-pu13vb9rsqgbh1u4oklhg47p3humh3gr.apps.googleusercontent.com";
                    options.ClientSecret = "bPQD_mVEnrilse6HYLfDoi9u";
                });
        }
    }
}