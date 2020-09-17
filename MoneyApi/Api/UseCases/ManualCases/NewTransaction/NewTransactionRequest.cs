using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.NewTransaction
{
    public class NewTransactionRequest: IRequest<AbstractAnswer<Guid>>
    {
        public Guid UserId { get; set; }
        public Guid TypeId { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }
        public Guid BillId { get; set; }
        public DateTime Date { get; set; }
    }
}