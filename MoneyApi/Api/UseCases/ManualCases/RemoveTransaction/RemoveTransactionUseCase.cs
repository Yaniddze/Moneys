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
        private readonly IMediator mediator;
        private readonly IEventBus eventBus;

        public RemoveTransactionUseCase(IMediator mediator, IEventBus eventBus)
        {
            this.mediator = mediator;
            this.eventBus = eventBus;
        }

        public async Task<AbstractAnswer> Handle(RemoveTransactionRequest request, CancellationToken cancellationToken)
        {
            var response = await mediator.Send(request, cancellationToken);

            if (response.Success)
            {
                eventBus.Publish(new RemoveTransactionEvent
                {
                    TransactionId = request.TransactionId,
                }, nameof(RemoveTransactionEvent));
            }

            return response;
        }
    }
}