using System;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.BillsCommands
{
    public class UpdateBillCommand: IRequest<AbstractAnswer<Bill>>
    {
        public Guid BillId { get; set; }
        public string NewTitle { get; set; }
    }
}