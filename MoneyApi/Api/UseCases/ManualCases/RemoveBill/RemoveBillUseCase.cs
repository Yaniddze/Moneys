using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.UseCases.Abstractions;
using Api.UseCases.Requests;
using MediatR;

namespace Api.UseCases.ManualCases.RemoveBill
{
    public class RemoveBillUseCase: IRequestHandler<RemoveBillRequest, AbstractAnswer>
    {
        private readonly IMediator _mediator;
        private readonly IEventBus _eventBus;

        public RemoveBillUseCase(IMediator mediator, IEventBus eventBus)
        {
            _mediator = mediator;
            _eventBus = eventBus;
        }

        public async Task<AbstractAnswer> Handle(RemoveBillRequest request, CancellationToken cancellationToken)
        {
            var removingAnswer = await _mediator.Send(new RemoveBillCommand
            {
                UserId = request.UserId,
                BillId = request.BillId,
            }, cancellationToken);

            if (removingAnswer.Success)
            {
                _eventBus.Publish(new BillDeletedEvent
                {
                    BillId = request.BillId,
                }, nameof(BillDeletedEvent));
                
                return new AbstractAnswer
                {
                    Success = true,
                };
            }

            return removingAnswer;
        }
    }
}