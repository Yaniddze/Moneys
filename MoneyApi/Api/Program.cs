using System;
using System.Linq;
using Api.DataBase;
using Api.DataBase.DbEntities;
using Api.Domain;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var application = CreateHostBuilder(args).Build();
            
            using (var scope = application.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<MoneysContext>();
                var mapper = scope.ServiceProvider.GetService<IMapper>();
                context.Database.Migrate();

                if (!context.TransactionTypes.Any())
                {
                    foreach (var defaultTransactionType in DefaultDBValues.GetDefaultTransactionTypes())
                    {
                        context.TransactionTypes.Add(
                            mapper.Map<TransactionType, TransactionTypeDB>(defaultTransactionType));
                    }

                    context.SaveChanges();
                }
            }
            
            application.Run();
        }
        
        private static bool? development;

        public static bool Development =>
            development ??= (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "")
                .Equals("Development");

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}