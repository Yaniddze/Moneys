using System;
using MediatR;

namespace Api.UseCases.ManualCases
{
    public class NewBillRequest: IRequest<bool>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}
