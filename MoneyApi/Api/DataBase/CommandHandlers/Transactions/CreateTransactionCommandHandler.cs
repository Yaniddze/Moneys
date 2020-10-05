using System;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<Api.Domain.Transaction>;

namespace Api.DataBase.CommandHandlers.Transactions
{
    public class CreateTransactionCommandHandler: IRequestHandler<CreateTransactionCommand, AbstractAnswer<Transaction>>
    {
        private readonly MoneysContext context;

        public CreateTransactionCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer<Transaction>> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var tempId = Guid.NewGuid();

                var foundedBill =
                    await context.Bills.FirstOrDefaultAsync(x => x.Id == request.BillId, cancellationToken);

                if (foundedBill is null)
                {
                    return CreateFailed(new[] {"Bill not found"});
                }
                
                var foundedType =
                    await context.TransactionTypes.FirstOrDefaultAsync(x => x.Id == request.TypeId, cancellationToken);

                if (foundedType is null)
                {
                    return CreateFailed(new[] {"Transactions type not found"});
                }
                
                context.Transactions.Add(new TransactionDB
                {
                    Id = tempId,
                    BillId = request.BillId,
                    TypeId = request.TypeId,
                    Date = request.Date,
                    Description = request.Description,
                    Value = request.Value,
                });

                await context.SaveChangesAsync(cancellationToken);
                
                return CreateSuccess(new Transaction
                {
                    Id = tempId,
                    Type = new TransactionType
                    {
                        Id = request.TypeId,
                        Title = foundedType.Title
                    },
                    Bill = new Bill
                    {
                        Id = request.BillId,
                        Title = foundedBill.Title,
                    },
                    Info = new TransactionInfo
                    {
                        Date = request.Date,
                        Description = request.Description,
                        Value = request.Value,
                    },
                });
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}