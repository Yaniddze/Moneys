using System;
using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.TransactionCommands
{
    public class GetTransactionsCommand: IRequest<AbstractAnswer<IEnumerable<Transaction>>>
    {
        public Guid UserId { get; set; }
    }
}