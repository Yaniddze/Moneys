using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.BillsCommands
{
    public class UpdateBillCommand: IRequest<AbstractAnswer>
    {
        public Guid BillId { get; set; }
        public string NewTitle { get; set; }
    }
}