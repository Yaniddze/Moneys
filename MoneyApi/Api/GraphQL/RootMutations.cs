using System;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using Api.UseCases.ManualCases.NewBill;
using Api.UseCases.ManualCases.NewTransaction;
using Api.UseCases.ManualCases.RemoveBill;
using Api.UseCases.ManualCases.RemoveTransaction;
using Api.UseCases.ManualCases.UpdateBill;
using Api.UseCases.ManualCases.UpdateTransaction;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using MediatR;

namespace Api.GraphQL
{
    [Authorize(Policy = "ApiScope")]
    public class RootMutations
    {
        private readonly IMediator mediator;

        public RootMutations(IMediator mediator)
        {
            this.mediator = mediator;
        }

        #region Bill
        [GraphQLDescription("Create new bill for user and return new bill's id")]
        public async Task<AbstractAnswer<Guid>> CreateBillAsync(NewBillRequest request)
        {
            return await mediator.Send(request);
        }
        
        [GraphQLDescription("Delete bill by id and return true on success")]
        public async Task<AbstractAnswer> RemoveBillAsync(RemoveBillRequest request)
        {
            return await mediator.Send(request);
        }
        
        [GraphQLDescription("Update bill by id and return true on success")]
        public async Task<AbstractAnswer> UpdateBillAsync(UpdateBillRequest request)
        {
            return await mediator.Send(request);
        }

        #endregion

        #region Transactions
        
        [GraphQLDescription("Create new transaction for user and return new transaction's id")]
        public async Task<AbstractAnswer<Guid>> AddTransactionAsync(NewTransactionRequest request)
        {
            return await mediator.Send(request);
        }
        
        [GraphQLDescription("Update transaction by id and return true on success")]
        public async Task<AbstractAnswer> UpdateTransactionAsync(UpdateTransactionRequest request)
        {
            return await mediator.Send(request);
        }
        
        [GraphQLDescription("Delete transaction by id and return true on success")]
        public async Task<AbstractAnswer> RemoveTransactionAsync(RemoveTransactionRequest request)
        {
            return await mediator.Send(request);
        }

        #endregion
    }
}