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
        
        public async Task<AbstractAnswer<IEnumerable<Bill>>> GetBillsAsync(GetBillsCommand command)
        {
            return await mediator.Send(command);
        }
        
        public async Task<AbstractAnswer<IEnumerable<TransactionType>>> GetTransactionTypesAsync()
        {
            return await mediator.Send(new GetTransactionTypesCommand());
        }

        public async Task<AbstractAnswer<IEnumerable<Transaction>>> GetTransactionsAsync(GetTransactionsCommand command)
        {
            return await mediator.Send(command);
        }
    }
}