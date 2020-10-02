using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using Api.UseCases.Commands.BillsCommands;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;

namespace Api.GraphQL
{
    public class RootQuery
    {
        private readonly IMediator mediator;

        public RootQuery(IMediator mediator)
        {
            this.mediator = mediator;
        }
        
        public async Task<AbstractAnswer<IEnumerable<Bill>>> GetBillsAsync(Guid userId)
        {
            return await mediator.Send(new GetBillsCommand
            {
                UserId = userId
            });
        }
        
        public async Task<AbstractAnswer<IEnumerable<TransactionType>>> GetTransactionTypesAsync()
        {
            return await mediator.Send(new GetTransactionTypesCommand());
        }

        public async Task<AbstractAnswer<IEnumerable<Transaction>>> GetTransactionsAsync(Guid userId)
        {
            return await mediator.Send(new GetTransactionsCommand
            {
                UserId = userId,
            });
        }
    }
}