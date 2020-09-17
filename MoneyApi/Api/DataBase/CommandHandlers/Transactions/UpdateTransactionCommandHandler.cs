using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer;

namespace Api.DataBase.CommandHandlers.Transactions
{
    public class UpdateTransactionCommandHandler: IRequestHandler<UpdateTransactionCommand, AbstractAnswer>
    {
        private readonly MoneysContext _context;

        public UpdateTransactionCommandHandler(MoneysContext context)
        {
            _context = context;
        }

        public async Task<AbstractAnswer> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var updated = await _context.Transactions
                    .Where(x => x.Id == request.TransactionId)
                    .UpdateAsync(x => new TransactionDB
                    {
                        TypeId = request.TypeId,
                        Date = request.Date,
                        Description = request.Description,
                        Value = request.Value,
                    }, cancellationToken);

                if (updated > 0)
                {
                    return CreateSuccess();
                }

                return CreateFailed(new[] {"Bad transaction id"});
            }
            catch (Exception e)
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}