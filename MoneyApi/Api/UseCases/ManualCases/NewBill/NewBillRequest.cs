using System;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.NewBill
{
    public class NewBillRequest: IRequest<AbstractAnswer<Bill>>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}
