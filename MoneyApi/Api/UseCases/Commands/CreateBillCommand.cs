using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands
{
    public class CreateBillCommand: IRequest<AbstractAnswer<Guid>>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}