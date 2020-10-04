using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.BillsCommands
{
    public class RemoveBillCommand: IRequest<AbstractAnswer<Guid>>
    {
        public Guid BillId { get; set; }
    }
}