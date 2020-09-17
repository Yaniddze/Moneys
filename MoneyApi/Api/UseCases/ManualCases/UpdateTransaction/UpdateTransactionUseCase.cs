using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events.TransactionEvents;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;

namespace Api.UseCases.ManualCases.UpdateTransaction
{
    public class UpdateTransactionUseCase: IRequestHandler<UpdateTransactionRequest, AbstractAnswer>
    {
        private readonly IEventBus _eventBus;
        private readonly IMediator _mediator;

        public UpdateTransactionUseCase(IEventBus eventBus, IMediator mediator)
        {
            _eventBus = eventBus;
            _mediator = mediator;
        }

        public async Task<AbstractAnswer> Handle(UpdateTransactionRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(new UpdateTransactionCommand
            {
                TransactionId = request.TransactionId,
                Date = request.Date,
                Description = request.Description,
                TypeId = request.TypeId,
                Value = request.Value,
            }, cancellationToken);

            if (response.Success)
            {
                _eventBus.Publish(new UpdateTransactionEvent
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