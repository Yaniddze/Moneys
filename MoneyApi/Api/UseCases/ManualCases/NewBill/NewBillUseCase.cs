using System.Threading;
using System.Threading.Tasks;
using Api.EventBus.Abstractions;
using Api.EventBus.Events;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using Api.UseCases.Commands.BillsCommands;
using MediatR;

using static Api.UseCases.Abstractions.AbstractAnswer;

namespace Api.UseCases.ManualCases.NewBill
{
    public class NewBillUseCase: IRequestHandler<NewBillRequest, AbstractAnswer>
    {
        private readonly IEventBus _eventBus;
        private readonly IMediator _mediator;

        public NewBillUseCase(IEventBus eventBus, IMediator mediator)
        {
            _eventBus = eventBus;
            _mediator = mediator;
        }

        public async Task<AbstractAnswer> Handle(NewBillRequest request, CancellationToken cancellationToken)
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
                    Id = creationResponse.Data,
                    Title = request.Title,
                    UserId = request.UserId,
                }, nameof(NewBillEvent));

                return CreateSuccess();
            }

            return CreateFailed(creationResponse.Errors);
        }
    }
}