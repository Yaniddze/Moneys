using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ServiceInstallers
{
    public static class ServiceInstallerExtension
    {
        public static void InstallFromAssembly(this IServiceCollection services, IConfiguration configuration)
        {
            typeof(Startup).Assembly.ExportedTypes
                .Where(x => typeof(IServiceInstaller).IsAssignableFrom(x) && !x.IsAbstract && !x.IsInterface)
                .Select(Activator.CreateInstance)
                .Cast<IServiceInstaller>()
                .ToList()
                .ForEach(x => x.Install(services, configuration));
        }
    }
}