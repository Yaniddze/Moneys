using System;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<Api.Domain.Bill>;

namespace Api.DataBase.CommandHandlers.Bills
{
    public class CreateBillCommandHandler: IRequestHandler<CreateBillCommand, AbstractAnswer<Bill>>
    {
        private readonly MoneysContext context;

        public CreateBillCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer<Bill>> Handle(CreateBillCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var tempId = Guid.NewGuid();

                var foundedUser = await context.Users
                    .FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

                if (foundedUser is null)
                {
                    return CreateFailed(new[] {"User doesn't exists"});
                }
                
                context.Bills.Add(new BillDB
                {
                    Id = tempId,
                    Title = request.Title,
                    UserId = request.UserId,
                });

                await context.SaveChangesAsync(cancellationToken);

                return CreateSuccess(new Bill
                {
                    Id = tempId,
                    Title = request.Title,
                });
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}