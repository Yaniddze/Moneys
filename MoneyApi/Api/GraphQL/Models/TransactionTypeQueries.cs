using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using MediatR;

namespace Api.GraphQL.Models
{
    public class TransactionTypeQueries
    {
        private readonly IMediator mediator;

        public TransactionTypeQueries(IMediator mediator)
        {
            this.mediator = mediator;
        }

        public async Task<AbstractAnswer<IEnumerable<TransactionType>>> GetTransactionTypesAsync(IResolverContext context)
        {
            return await mediator.Send(new GetTransactionTypesCommand());
        }
    }
}