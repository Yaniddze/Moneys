using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.ServiceInstallers.Abstractions;
using Api.UseCases.EventHandlers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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