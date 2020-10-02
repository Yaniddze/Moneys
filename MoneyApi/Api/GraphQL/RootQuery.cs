using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using Api.UseCases.Commands.BillsCommands;
using HotChocolate.Resolvers;
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
        
        public async Task<AbstractAnswer<IEnumerable<Bill>>> GetBills(Guid userId, IResolverContext context)
        {
            return await mediator.Send(new GetBillsCommand
            {
                UserId = userId
            });
        }
        
        public async Task<AbstractAnswer<IEnumerable<TransactionType>>> GetTransactionTypesAsync(IResolverContext context)
        {
            return await mediator.Send(new GetTransactionTypesCommand());
        }
    }
}