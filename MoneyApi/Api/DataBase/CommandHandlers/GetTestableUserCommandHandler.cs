using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<Api.Domain.User>;

namespace Api.DataBase.CommandHandlers
{
    public class GetTestableUserCommandHandler: IRequestHandler<GetTestableUserCommand, AbstractAnswer<User>>
    {
        private readonly IMapper mapper;
        private readonly MoneysContext context;

        public GetTestableUserCommandHandler(MoneysContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<AbstractAnswer<User>> Handle(GetTestableUserCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var founded = await context.Users
                    .FirstOrDefaultAsync(x => x.Id == Program.TestableUserGuid, cancellationToken);

                if (founded is null)
                {
                    return CreateFailed(new[] {"User not found"});
                }

                return CreateSuccess(mapper.Map<UserDB, User>(founded));
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}