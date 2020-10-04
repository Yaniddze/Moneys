using System;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.BillsCommands
{
    public class CreateBillCommand: IRequest<AbstractAnswer<Bill>>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}