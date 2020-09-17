using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.TransactionCommands
{
    public class RemoveTransactionCommand: IRequest<AbstractAnswer>
    {
        public Guid TransactionId { get; set; }
    }
}