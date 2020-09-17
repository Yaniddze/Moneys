using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands
{
    public class UpdateBillCommand: IRequest<AbstractAnswer>
    {
        public Guid BillId { get; set; }
        public Guid UserId { get; set; }
        public string NewTitle { get; set; }
    }
}