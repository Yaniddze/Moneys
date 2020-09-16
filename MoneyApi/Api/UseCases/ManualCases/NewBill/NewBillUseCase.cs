using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.UseCases.Requests;
using MediatR;

namespace Api.UseCases.ManualCases.NewBill
{
    public class NewBillUseCase: IRequestHandler<NewBillRequest>
    {
        private readonly IEventBus _eventBus;
        private readonly IMediator _mediator;

        public NewBillUseCase(IEventBus eventBus, IMediator mediator)
        {
            _eventBus = eventBus;
            _mediator = mediator;
        }

        public async Task<Unit> Handle(NewBillRequest request, CancellationToken cancellationToken)
        {
            var createdGuid = await _mediator.Send(new CreateBillRequest
            {
                UserId = request.UserId,
                Title = request.Title,
            }, cancellationToken);

            _eventBus.Publish(new NewBillEvent
            {
                Id = createdGuid,
                Title = request.Title,
                UserId = request.UserId,
            }, nameof(NewBillEvent));
            
            return Unit.Value;
        }
    }
}