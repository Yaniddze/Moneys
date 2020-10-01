using System;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using Api.UseCases.ManualCases.NewBill;
using HotChocolate.Resolvers;
using MediatR;

namespace Api.GraphQL.Models.Bills
{
    public class BillMutations
    {
        private readonly IMediator mediator;

        public BillMutations(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<AbstractAnswer<Guid>> CreateBillAsync(Guid userId, string title, IResolverContext context)
        {
            return await mediator.Send(new NewBillRequest
            {
                Title = title,
                UserId = userId,
            });
        }

        public async Task<AbstractAnswer> DeleteBillAsync(Guid billId, IResolverContext context)
        {
            return await mediator.Send(new RemoveBillCommand
            {
                BillId = billId,
            });
        }

        public async Task<AbstractAnswer> UpdateBillAsync(Guid billId, string newTitle, IResolverContext context)
        {
            return await mediator.Send(new UpdateBillCommand
            {
                BillId = billId,
                NewTitle = newTitle,
            });
        }
    }
}