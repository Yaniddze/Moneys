using System;
using MediatR;

namespace Api.UseCases.Requests
{
    public class UpdateBillTitleRequest: IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid BillId { get; set; }
    }
}