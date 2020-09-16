using Api.ApplicationInstallers.Abstractions;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.UseCases.EventHandlers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Api.ApplicationInstallers
{
    public class EventHandlersApplicationInstaller: IApplicationInstaller
    {
        public void Install(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using var scope = app.ApplicationServices.CreateScope();

            var eventBus = scope.ServiceProvider.GetService<IEventBus>();
            
            // Subscribe event handlers here
            eventBus.Subscribe<NewUserEvent, NewUserEventHandler>(nameof(NewUserEvent), env.ApplicationName);
        }
    }
}
