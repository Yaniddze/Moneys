using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.RemoveBill
{
    public class RemoveBillRequest: IRequest<AbstractAnswer<Guid>>
    {
        public Guid BillId { get; set; }
    }
}