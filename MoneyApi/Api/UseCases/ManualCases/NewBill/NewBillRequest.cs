using System;
using MediatR;

namespace Api.UseCases.ManualCases.NewBill
{
    public class NewBillRequest: IRequest
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}
