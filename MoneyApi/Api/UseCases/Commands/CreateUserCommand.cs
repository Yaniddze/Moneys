using System;
using MediatR;

namespace Api.UseCases.Commands
{
    public class CreateUserCommand: IRequest
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
    }
}