using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands
{
    public class GetTestableUserCommand: IRequest<AbstractAnswer<User>>
    {
        
    }
}