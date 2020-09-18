using System;
using System.Linq;
using Api.Controllers;
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

            var development = (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "")
                .Equals("Development");
            
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

                if (development)
                {
                    var testableUser = context.Users.FirstOrDefault(x => x.Id == TestController.TestableUserGuid);

                    if (testableUser is null)
                    {
                        context.Users.Add(new UserDB
                        {
                            Id = TestController.TestableUserGuid,
                            Username = "TestUser",
                        });

                        context.SaveChanges();
                    }
                }
            }
            
            application.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}