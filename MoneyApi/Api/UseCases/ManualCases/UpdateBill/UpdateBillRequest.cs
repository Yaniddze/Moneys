using System;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.UpdateBill
{
    public class UpdateBillRequest: IRequest<AbstractAnswer<Bill>>
    {
        public Guid BillId { get; set; }
        public string NewTitle { get; set; }
    }
}