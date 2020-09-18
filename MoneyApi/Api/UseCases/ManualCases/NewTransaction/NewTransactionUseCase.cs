using System;
using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events.TransactionEvents;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;

namespace Api.UseCases.ManualCases.NewTransaction
{
    public class NewTransactionUseCase: IRequestHandler<NewTransactionRequest, AbstractAnswer<Guid>>
    {
        private readonly IMediator mediator;
        private readonly IEventBus eventBus;
        
        public NewTransactionUseCase(IMediator mediator, IEventBus eventBus)
        {
            this.mediator = mediator;
            this.eventBus = eventBus;
        }

        public async Task<AbstractAnswer<Guid>> Handle(NewTransactionRequest request, CancellationToken cancellationToken)
        {
            var response = await mediator.Send(new CreateTransactionCommand
            {
                BillId = request.BillId,
                TypeId = request.TypeId,
                Date = request.Date,
                Description = request.Description,
                UserId = request.UserId,
                Value = request.Value,
            }, cancellationToken);

            if (response.Success)
            {
                eventBus.Publish(new NewTransactionEvent
                {
                    Id = response.Data,
                    BillId = request.BillId,
                    Date = request.Date,
                    Description = request.Description,
                    UserId = request.UserId,
                    Value = request.Value,
                }, nameof(NewTransactionEvent));
            }

            return response;
        }
    }
}