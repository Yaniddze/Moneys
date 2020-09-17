using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.RemoveBill
{
    public class RemoveBillRequest: IRequest<AbstractAnswer>
    {
        public Guid BillId { get; set; }
    }
}