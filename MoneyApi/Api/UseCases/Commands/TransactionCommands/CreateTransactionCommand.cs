using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.TransactionCommands
{
    public class CreateTransactionCommand: IRequest<AbstractAnswer<Guid>>
    {
        public Guid UserId { get; set; }
        public Guid TypeId { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }
        public Guid BillId { get; set; }
        public DateTime Date { get; set; }
    }
}