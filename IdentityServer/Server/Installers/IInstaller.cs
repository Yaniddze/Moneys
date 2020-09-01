using AutoMapper.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Installers
{
    public interface IInstaller
    {
        void InstallService(IServiceCollection serviceCollection, IConfiguration configuration);
    }
}