using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.NewBill
{
    public class NewBillRequest: IRequest<AbstractAnswer<Guid>>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}
