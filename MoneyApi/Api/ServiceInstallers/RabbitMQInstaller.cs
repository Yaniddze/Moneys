using Api.EventBus;
using Api.EventBus.Abstractions;
using Api.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RabbitMQ.Client;
using Api.EventBus;

namespace Api.ServiceInstallers
{
    public class RabbitMQInstaller: IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
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