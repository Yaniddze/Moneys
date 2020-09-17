using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using MediatR;

namespace Api.UseCases.ManualCases.UpdateBill
{
    public class UpdateBillUseCase: IRequestHandler<UpdateBillRequest, AbstractAnswer>
    {
        private readonly IMediator _mediator;
        private readonly IEventBus _eventBus;

        public UpdateBillUseCase(IMediator mediator, IEventBus eventBus)
        {
            _mediator = mediator;
            _eventBus = eventBus;
        }

        public async Task<AbstractAnswer> Handle(UpdateBillRequest request, CancellationToken cancellationToken)
        {
            var updateAnswer = await _mediator.Send(new UpdateBillCommand
            {
                UserId = request.UserId,
                BillId = request.BillId,
                NewTitle = request.NewTitle,
            }, cancellationToken);

            if (updateAnswer.Success)
            {
                _eventBus.Publish(new BillUpdatedEvent
                {
                    BillId = request.BillId,
                    NewTitle = request.NewTitle,
                }, nameof(BillUpdatedEvent));
            }

            return updateAnswer;
        }
    }
}