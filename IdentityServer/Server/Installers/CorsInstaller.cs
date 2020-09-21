using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Installers
{
    public class CorsInstaller: IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            services.AddCors(config =>
            {
                config.AddDefaultPolicy(policy => 
                    policy
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:8080")
                        .AllowAnyMethod()
                );
            });
        }
    }
}