using System;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Guid>;

namespace Api.DataBase.CommandHandlers.Transactions
{
    public class CreateTransactionCommandHandler: IRequestHandler<CreateTransactionCommand, AbstractAnswer<Guid>>
    {
        private readonly MoneysContext _context;

        public CreateTransactionCommandHandler(MoneysContext context)
        {
            _context = context;
        }

        public async Task<AbstractAnswer<Guid>> Handle(CreateTransactionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var tempId = Guid.NewGuid();

                _context.Transactions.Add(new TransactionDB
                {
                    Id = tempId,
                    BillId = request.BillId,
                    Date = request.Date,
                    Description = request.Description,
                    Value = request.Value,
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