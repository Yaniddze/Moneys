using System;
using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands.BillsCommands
{
    public class GetBillsCommand: IRequest<AbstractAnswer<IEnumerable<Bill>>>
    {
        public Guid UserId { get; set; }
    }
}