using System;
using System.Linq;
using Api.AutoMappers.Abstractions;
using AutoMapper;

namespace Api.AutoMappers.Extensions
{
    public static class MappersInstallerExtension
    {
        public static void InstallFromAssembly(this IMapperConfigurationExpression options)
        {
            typeof(Startup).Assembly.ExportedTypes
                .Where(x => typeof(IMapperInstaller).IsAssignableFrom(x) && !x.IsAbstract && !x.IsInterface)
                .Select(Activator.CreateInstance)
                .Cast<IMapperInstaller>()
                .ToList()
                .ForEach(x => x.Install(options));
        }
    }
}