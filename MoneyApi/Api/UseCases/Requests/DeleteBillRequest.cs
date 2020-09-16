using System;
using MediatR;

namespace Api.UseCases.Requests
{
    public class DeleteBillRequest: IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid BillId { get; set; }
    }
}