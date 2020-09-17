using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.TransactionCommands
{
    public class UpdateTransactionCommand: IRequest<AbstractAnswer>
    {
        public Guid TransactionId { get; set; }
        public Guid TypeId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public double Value { get; set; }
    }
}