using System;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.UseCases.Commands;
using MediatR;

namespace Api.UseCases.EventHandlers
{
    public class NewUserEventHandler: IIntegrationEventHandler<NewUserEvent>
    {
        private readonly IMediator mediator;

        public NewUserEventHandler(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task HandleAsync(NewUserEvent @event)
        {
            await mediator.Send(new CreateUserCommand
            {
                Id = Guid.Parse(@event.Id),
                Username = @event.Username,
            });
        }
    }
}