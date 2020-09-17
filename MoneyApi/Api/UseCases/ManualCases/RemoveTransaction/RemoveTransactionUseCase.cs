using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events.TransactionEvents;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.RemoveTransaction
{
    public class RemoveTransactionUseCase: IRequestHandler<RemoveTransactionRequest, AbstractAnswer>
    {
        private readonly IMediator _mediator;
        private readonly IEventBus _eventBus;

        public RemoveTransactionUseCase(IMediator mediator, IEventBus eventBus)
        {
            _mediator = mediator;
            _eventBus = eventBus;
        }

        public async Task<AbstractAnswer> Handle(RemoveTransactionRequest request, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(request, cancellationToken);

            if (response.Success)
            {
                _eventBus.Publish(new RemoveTransactionEvent
                {
                    TransactionId = request.TransactionId,
                }, nameof(RemoveTransactionEvent));
            }

            return response;
        }
    }
}