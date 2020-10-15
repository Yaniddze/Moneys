using System;
using System.Threading;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using Server.EventBus;
using Server.EventBus.Abstractions;
using Server.Options;

namespace Server.Installers
{
    public class RabbitMQInstaller: IInstaller
    {
        public void InstallService(IServiceCollection services, IConfiguration configuration)
        {
            var rabbitConfig = new RabbitMQOptions();
            var optionsFromConfig = configuration.GetSection(nameof(RabbitMQOptions));
            
            optionsFromConfig.Bind(rabbitConfig);

            var logger = services.BuildServiceProvider().GetService<ILogger<RabbitMQInstaller>>();

            while (true)
            {
                try
                {
                    services.AddSingleton<IEventBus>(new RabbitBus(new ConnectionFactory
                    {
                        HostName = rabbitConfig.Host,
                        Port = rabbitConfig.Port,
                        UserName = rabbitConfig.User,
                        Password = rabbitConfig.Password,
                        DispatchConsumersAsync = true,
                    }, services.BuildServiceProvider()));

                    break;
                }
                catch
                {
                    logger.LogInformation("Failed connect to RabbitMQ. Sleep 10s...");
                    Thread.Sleep(10000);
                }
            }
        }
    }
}