using System;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using Api.UseCases.Commands.BillsCommands;
using MediatR;
using Microsoft.EntityFrameworkCore;

using static Api.UseCases.Abstractions.AbstractAnswer<System.Guid>;

namespace Api.DataBase.CommandHandlers
{
    public class CreateBillCommandHandler: IRequestHandler<CreateBillCommand, AbstractAnswer<Guid>>
    {
        private readonly MoneysContext _context;

        public CreateBillCommandHandler(MoneysContext context)
        {
            _context = context;
        }

        public async Task<AbstractAnswer<Guid>> Handle(CreateBillCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var tempId = Guid.NewGuid();

                var foundedUser = await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

                if (foundedUser is null)
                {
                    return CreateFailed(new[] {"User doesn't exists"});
                }
                
                _context.Bills.Add(new BillDB
                {
                    Id = tempId,
                    Title = request.Title,
                    UserId = request.UserId,
                });

                await _context.SaveChangesAsync(cancellationToken);

                return CreateSuccess(tempId);
            }
            catch (Exception e)
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}