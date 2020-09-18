using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Commands;
using MediatR;

namespace Api.DataBase.CommandHandlers
{
    public class CreateUserCommandHandler: IRequestHandler<CreateUserCommand>
    {
        private readonly MoneysContext _context;

        public CreateUserCommandHandler(MoneysContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            _context.Users.Add(new UserDB
            {
                Id = request.Id,
                Username = request.Username,
            });

            await _context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}