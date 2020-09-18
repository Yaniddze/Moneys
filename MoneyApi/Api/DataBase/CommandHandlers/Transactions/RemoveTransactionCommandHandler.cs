using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using MediatR;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer;

namespace Api.DataBase.CommandHandlers.Transactions
{
    public class RemoveTransactionCommandHandler: IRequestHandler<RemoveTransactionCommand, AbstractAnswer>
    {
        private readonly MoneysContext context;

        public RemoveTransactionCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer> Handle(RemoveTransactionCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var removed = await context.Transactions
                    .Where(x => x.Id == request.TransactionId)
                    .DeleteAsync(cancellationToken);

                if (removed > 0)
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