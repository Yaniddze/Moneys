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
        private readonly IMediator _mediator;

        public NewUserEventHandler(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task HandleAsync(NewUserEvent @event)
        {
            await _mediator.Send(new CreateUserCommand
            {
                Id = Guid.Parse(@event.Id),
                Username = @event.Username,
            });
        }
    }
}