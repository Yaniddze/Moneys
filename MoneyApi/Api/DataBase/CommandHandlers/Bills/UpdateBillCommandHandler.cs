using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using MediatR;
using Z.EntityFramework.Plus;
using static Api.UseCases.Abstractions.AbstractAnswer<Api.Domain.Bill>;

namespace Api.DataBase.CommandHandlers.Bills
{
    public class UpdateBillCommandHandler: IRequestHandler<UpdateBillCommand, AbstractAnswer<Bill>>
    {
        private readonly MoneysContext context;

        public UpdateBillCommandHandler(MoneysContext context)
        {
            this.context = context;
        }

        public async Task<AbstractAnswer<Bill>> Handle(UpdateBillCommand request, CancellationToken cancellationToken)
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
                    return CreateSuccess(new Bill
                    {
                        Id = request.BillId,
                        Title = request.NewTitle,
                    });
                }

                return CreateFailed(new[] {"Bad bill id"});
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}