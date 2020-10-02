using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using Api.UseCases.Commands.BillsCommands;
using Api.UseCases.Commands.TransactionCommands;
using HotChocolate;
using MediatR;

namespace Api.GraphQL
{
    public class RootQuery
    {
        private readonly IMediator mediator;
        private readonly bool development;

        public RootQuery(IMediator mediator)
        {
            this.mediator = mediator;
            development = (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "").Equals("Development");
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

        [GraphQLDescription("Return test user in development mode")]
        public async Task<AbstractAnswer<User>> GetTestableUserAsync()
        {
            if (development)
            {
                return await mediator.Send(new GetTestableUserCommand());
            }
            return AbstractAnswer<User>.CreateFailed(new []{ "Can't give testable user in not development mode" });
        }
    }
}