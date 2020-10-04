using System.Threading;
using System.Threading.Tasks;
using Api.Domain;
using Api.EventBus.Abstractions;
using Api.EventBus.Events.BillEvents;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using MediatR;

namespace Api.UseCases.ManualCases.NewBill
{
    public class NewBillUseCase: IRequestHandler<NewBillRequest, AbstractAnswer<Bill>>
    {
        private readonly IEventBus _eventBus;
        private readonly IMediator _mediator;

        public NewBillUseCase(IEventBus eventBus, IMediator mediator)
        {
            _eventBus = eventBus;
            _mediator = mediator;
        }

        public async Task<AbstractAnswer<Bill>> Handle(NewBillRequest request, CancellationToken cancellationToken)
        {
            var creationResponse = await _mediator.Send(new CreateBillCommand
            {
                UserId = request.UserId,
                Title = request.Title,
            }, cancellationToken);

            if (creationResponse.Success)
            {
                _eventBus.Publish(new NewBillEvent
                {
                    Id = creationResponse.Data.Id,
                    Title = request.Title,
                    UserId = request.UserId,
                }, nameof(NewBillEvent));
            }

            return creationResponse;
        }
    }
}