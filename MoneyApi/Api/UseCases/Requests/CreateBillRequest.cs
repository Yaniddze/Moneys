using System;
using MediatR;

namespace Api.UseCases.Requests
{
    public class CreateBillRequest: IRequest<Guid>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}