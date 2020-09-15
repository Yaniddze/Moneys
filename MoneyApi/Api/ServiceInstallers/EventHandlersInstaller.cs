using Api.UseCases.EventHandlers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Server.EventBus.Abstractions;
using Server.EventBus.Events;

namespace Api.ServiceInstallers
{
    public class EventHandlersInstaller: IServiceInstaller
    {
        public void Install(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IIntegrationEventHandler<NewUserEvent>, NewUserEventHandler>();
        }
    }
}