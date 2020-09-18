using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.EventBus.Events.BillEvents;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using Api.UseCases.Commands.BillsCommands;
using MediatR;

namespace Api.UseCases.ManualCases.UpdateBill
{
    public class UpdateBillUseCase: IRequestHandler<UpdateBillRequest, AbstractAnswer>
    {
        private readonly IMediator mediator;
        private readonly IEventBus eventBus;

        public UpdateBillUseCase(IMediator mediator, IEventBus eventBus)
        {
            this.mediator = mediator;
            this.eventBus = eventBus;
        }

        public async Task<AbstractAnswer> Handle(UpdateBillRequest request, CancellationToken cancellationToken)
        {
            var updateAnswer = await mediator.Send(new UpdateBillCommand
            {
                BillId = request.BillId,
                NewTitle = request.NewTitle,
            }, cancellationToken);

            if (updateAnswer.Success)
            {
                eventBus.Publish(new BillUpdatedEvent
                {
                    BillId = request.BillId,
                    NewTitle = request.NewTitle,
                }, nameof(BillUpdatedEvent));
            }

            return updateAnswer;
        }
    }
}