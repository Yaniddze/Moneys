using System;
using Api.Options;
using Api.ServiceInstallers.Abstractions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Api.ServiceInstallers
{
    public class SwaggerInstaller: IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            var devVariable = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "";
            if (!devVariable.Equals("Development")) return;
            
            var swaggerOptions = new SwaggerOptions();
            var optionsFromConfig = configuration.GetSection(nameof(SwaggerOptions));
            
            optionsFromConfig.Bind(swaggerOptions);

            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc(swaggerOptions.Version, new OpenApiInfo
                {
                    Title = swaggerOptions.AppName,
                    Version = swaggerOptions.Version,
                });
            });
        }
    }
}