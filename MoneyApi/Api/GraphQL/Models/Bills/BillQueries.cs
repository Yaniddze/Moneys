using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using HotChocolate.Resolvers;
using HotChocolate.Types;
using MediatR;

namespace Api.GraphQL.Models.Bills
{
    public class BillQueries
    {
        private readonly IMediator mediator;

        public BillQueries(IMediator mediator)
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
    }
}