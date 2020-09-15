using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace Api.ApplicationInstallers
{
    public static class InstallExtension
    {
        public static void InstallFromAssembly(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            typeof(Startup).Assembly.ExportedTypes
                .Where(x => typeof(IApplicationInstaller).IsAssignableFrom(x) && !x.IsAbstract && !x.IsInterface)
                .Select(Activator.CreateInstance)
                .Cast<IApplicationInstaller>()
                .ToList()
                .ForEach(x => x.Install(app, env));
        }
    }
}