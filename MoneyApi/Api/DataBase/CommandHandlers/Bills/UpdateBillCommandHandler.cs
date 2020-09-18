using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using MediatR;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer;

namespace Api.DataBase.CommandHandlers.Bills
{
    public class UpdateBillCommandHandler: IRequestHandler<UpdateBillCommand, AbstractAnswer>
    {
        private readonly MoneysContext context;

        public UpdateBillCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer> Handle(UpdateBillCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var updatedCount = await context.Bills
                    .Where(x => x.Id == request.BillId)
                    .UpdateAsync(x => new BillDB
                    {
                        Title = request.NewTitle,
                    }, cancellationToken);

                if (updatedCount > 0)
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