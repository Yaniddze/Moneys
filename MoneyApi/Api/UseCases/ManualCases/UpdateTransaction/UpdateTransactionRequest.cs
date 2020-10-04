using System;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.UpdateTransaction
{
    public class UpdateTransactionRequest: IRequest<AbstractAnswer<Transaction>>
    {
        public Guid TransactionId { get; set; }
        public Guid TypeId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public double Value { get; set; }
    }
}