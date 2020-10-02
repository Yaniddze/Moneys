using System;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using Api.UseCases.ManualCases.NewBill;
using MediatR;

namespace Api.GraphQL
{
    public class RootMutations
    {
        private readonly IMediator mediator;

        public RootMutations(IMediator mediator)
        {
            this.mediator = mediator;
        }

        #region Bill

        public async Task<AbstractAnswer<Guid>> CreateBillAsync(Guid userId, string title)
        {
            return await mediator.Send(new NewBillRequest
            {
                Title = title,
                UserId = userId,
            });
        }

        public async Task<AbstractAnswer> DeleteBillAsync(Guid billId)
        {
            return await mediator.Send(new RemoveBillCommand
            {
                BillId = billId,
            });
        }

        public async Task<AbstractAnswer> UpdateBillAsync(Guid billId, string newTitle)
        {
            return await mediator.Send(new UpdateBillCommand
            {
                BillId = billId,
                NewTitle = newTitle,
            });
        }

        #endregion
        
        
    }
}