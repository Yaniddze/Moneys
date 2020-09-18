using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using MediatR;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer;

namespace Api.DataBase.CommandHandlers.Bills
{
    public class RemoveBillCommandHandler: IRequestHandler<RemoveBillCommand, AbstractAnswer>
    {
        private readonly MoneysContext context;

        public RemoveBillCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer> Handle(RemoveBillCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var deletedCount = await context.Bills
                    .Where(x => x.Id == request.BillId)
                    .DeleteAsync(cancellationToken);

                if (deletedCount > 0)
                {
                    return CreateSuccess();
                }

                return CreateFailed(new[] {"Bad bill id"});
            }
            catch (Exception e)
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}
