using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Commands;
using MediatR;

namespace Api.DataBase.CommandHandlers
{
    public class CreateUserCommandHandler: IRequestHandler<CreateUserCommand>
    {
        private readonly MoneysContext context;

        public CreateUserCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            context.Users.Add(new UserDB
            {
                Id = request.Id,
                Username = request.Username,
            });

            await context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}