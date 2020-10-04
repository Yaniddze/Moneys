using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer<Api.Domain.Transaction>;

namespace Api.DataBase.CommandHandlers.Transactions
{
    public class UpdateTransactionCommandHandler: IRequestHandler<UpdateTransactionCommand, AbstractAnswer<Transaction>>
    {
        private readonly MoneysContext context;

        public UpdateTransactionCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer<Transaction>> Handle(UpdateTransactionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var updated = await context.Transactions
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
                    return CreateSuccess(new Transaction
                    {
                        Id = request.TransactionId,
                        Type = new TransactionType
                        {
                            Id = request.TypeId,
                        },
                        Info = new TransactionInfo
                        {
                            Date = request.Date,
                            Description = request.Description,
                            Value = request.Value,
                        },
                    });
                }

                return CreateFailed(new[] {"Bad transaction id"});
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}