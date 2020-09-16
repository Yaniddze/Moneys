using Api.AutoMappers.Extensions;
using Api.ServiceInstallers.Abstractions;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers
{
    public class AutoMapperInstaller: IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(options => options.InstallFromAssembly(), typeof(Startup));
        }
    }
}