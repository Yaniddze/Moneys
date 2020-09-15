using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Microsoft.Extensions.Logging;

namespace Api.UseCases.EventHandlers
{
    public class NewUserEventHandler: IIntegrationEventHandler<NewUserEvent>
    {
        private readonly ILogger<NewUserEventHandler> _logger;

        public NewUserEventHandler(ILogger<NewUserEventHandler> logger)
        {
            _logger = logger;
        }

        public async Task HandleAsync(NewUserEvent @event)
        {
            _logger.LogInformation($"New user\n\t name: {@event.Username}, id: {@event.Id}");
        }
    }
}