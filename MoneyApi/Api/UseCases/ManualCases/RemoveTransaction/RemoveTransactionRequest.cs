using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.RemoveTransaction
{
    public class RemoveTransactionRequest: IRequest<AbstractAnswer<Guid>>
    {
        public Guid TransactionId { get; set; }
    }
}