using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.EventBus.Abstractions;
using Api.EventBus.Events.TransactionEvents;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;

namespace Api.UseCases.ManualCases.UpdateTransaction
{
    public class UpdateTransactionUseCase: IRequestHandler<UpdateTransactionRequest, AbstractAnswer<Transaction>>
    {
        private readonly IEventBus eventBus;
        private readonly IMediator mediator;

        public UpdateTransactionUseCase(IEventBus eventBus, IMediator mediator)
        {
            this.eventBus = eventBus;
            this.mediator = mediator;
        }

        public async Task<AbstractAnswer<Transaction>> Handle(UpdateTransactionRequest request, CancellationToken cancellationToken)
        {
            var response = await mediator.Send(new UpdateTransactionCommand
            {
                TransactionId = request.TransactionId,
                Date = request.Date,
                Description = request.Description,
                TypeId = request.TypeId,
                Value = request.Value,
            }, cancellationToken);

            if (response.Success)
            {
                eventBus.Publish(new UpdateTransactionEvent
                {
                    TransactionId = request.TransactionId,
                    Date = request.Date,
                    Description = request.Description,
                    TypeId = request.TypeId,
                    Value = request.Value,
                }, nameof(UpdateTransactionEvent));
            }

            return response;
        }
    }
}