using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using Api.UseCases.Commands.BillsCommands;
using Api.UseCases.Commands.TransactionCommands;
using HotChocolate;
using HotChocolate.AspNetCore.Authorization;
using MediatR;

namespace Api.GraphQL
{    
    [Authorize(Policy = "ApiScope")]
    public class RootQuery
    {
        private readonly IMediator mediator;

        public RootQuery(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [GraphQLDescription("Returns all user's bills by user id")]
        public async Task<AbstractAnswer<IEnumerable<Bill>>> GetBillsAsync(GetBillsCommand command)
        {
            return await mediator.Send(command);
        }
        
        [GraphQLDescription("Returns all transaction types")]
        public async Task<AbstractAnswer<IEnumerable<TransactionType>>> GetTransactionTypesAsync()
        {
            return await mediator.Send(new GetTransactionTypesCommand());
        }

        [GraphQLDescription("Returns all user's transactions by user id")]
        public async Task<AbstractAnswer<IEnumerable<Transaction>>> GetTransactionsAsync(GetTransactionsCommand command)
        {
            return await mediator.Send(command);
        }
    }
}