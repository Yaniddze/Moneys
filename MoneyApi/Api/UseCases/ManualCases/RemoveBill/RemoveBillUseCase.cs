using System;
using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events.BillEvents;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using MediatR;

namespace Api.UseCases.ManualCases.RemoveBill
{
    public class RemoveBillUseCase: IRequestHandler<RemoveBillRequest, AbstractAnswer<Guid>>
    {
        private readonly IMediator mediator;
        private readonly IEventBus eventBus;

        public RemoveBillUseCase(IMediator mediator, IEventBus eventBus)
        {
            this.mediator = mediator;
            this.eventBus = eventBus;
        }

        public async Task<AbstractAnswer<Guid>> Handle(RemoveBillRequest request, CancellationToken cancellationToken)
        {
            var removingAnswer = await mediator.Send(new RemoveBillCommand
            {
                BillId = request.BillId,
            }, cancellationToken);

            if (removingAnswer.Success)
            {
                eventBus.Publish(new BillDeletedEvent
                {
                    BillId = request.BillId,
                }, nameof(BillDeletedEvent));
            }

            return removingAnswer;
        }
    }
}