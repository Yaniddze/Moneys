using System.Linq;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Server.Data;

namespace Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var app = CreateHostBuilder(args).Build();

            using(var scope = app.Services.CreateScope())
            {
                scope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();
                scope.ServiceProvider.GetRequiredService<IdentityContext>().Database.Migrate();
                
                var context = scope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
                context.Database.Migrate();

                if (!context.Clients.Any())
                {
                    IdentityConfiguration.GetClients()
                        .ToList()
                        .ForEach(client => context.Clients.Add(client.ToEntity()));

                    context.SaveChanges();
                }

                if (!context.IdentityResources.Any())
                {
                    IdentityConfiguration.GetIdentityResources()
                        .ToList()
                        .ForEach(resource => context.IdentityResources.Add(resource.ToEntity()));

                    context.SaveChanges();
                }

                if (!context.ApiScopes.Any())
                {
                    IdentityConfiguration.GetApiScopes()
                        .ToList()
                        .ForEach(api => context.ApiScopes.Add(api.ToEntity()));

                    context.SaveChanges();
                }
            }
            

            app.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}