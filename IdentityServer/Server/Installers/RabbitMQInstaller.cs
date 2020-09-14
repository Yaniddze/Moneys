using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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

            services.AddSingleton<IEventBus>(new RabbitBus(new ConnectionFactory
            {
                HostName = rabbitConfig.Host,
                Port = rabbitConfig.Port,
                UserName = rabbitConfig.User,
                Password = rabbitConfig.Password,
                DispatchConsumersAsync = true,
            }, services.BuildServiceProvider()));
        }
    }
}