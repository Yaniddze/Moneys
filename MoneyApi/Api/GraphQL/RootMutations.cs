using System;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.ManualCases.NewBill;
using Api.UseCases.ManualCases.NewTransaction;
using Api.UseCases.ManualCases.RemoveBill;
using Api.UseCases.ManualCases.RemoveTransaction;
using Api.UseCases.ManualCases.UpdateBill;
using Api.UseCases.ManualCases.UpdateTransaction;
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
        public async Task<AbstractAnswer<Bill>> CreateBillAsync(NewBillRequest request)
        {
            return await mediator.Send(request);
        }
        
        public async Task<AbstractAnswer<Guid>> RemoveBillAsync(RemoveBillRequest request)
        {
            return await mediator.Send(request);
        }
        
        public async Task<AbstractAnswer<Bill>> UpdateBillAsync(UpdateBillRequest request)
        {
            return await mediator.Send(request);
        }

        #endregion

        #region Transactions
        
        public async Task<AbstractAnswer<Transaction>> CreateTransactionAsync(NewTransactionRequest request)
        {
            return await mediator.Send(request);
        }
        
        public async Task<AbstractAnswer> UpdateTransactionAsync(UpdateTransactionRequest request)
        {
            return await mediator.Send(request);
        }
        
        public async Task<AbstractAnswer<Guid>> RemoveTransactionAsync(RemoveTransactionRequest request)
        {
            return await mediator.Send(request);
        }

        #endregion
    }
}