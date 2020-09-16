using System;
using MediatR;

namespace Api.UseCases.ManualCases.RemoveBill
{
    public class RemoveBillRequest: IRequest<AbstractAnswer>
    {
        public Guid UserId { get; set; }
        public Guid BillId { get; set; }
    }
}