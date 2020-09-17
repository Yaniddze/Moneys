using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using MediatR;
using Z.EntityFramework.Plus;

namespace Api.DataBase.CommandHandlers
{
    public class UpdateBillCommandHandler: IRequestHandler<UpdateBillCommand, AbstractAnswer>
    {
        private readonly MoneysContext _context;

        public UpdateBillCommandHandler(MoneysContext context)
        {
            _context = context;
        }

        public async Task<AbstractAnswer> Handle(UpdateBillCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var updatedCount = await _context.Bills
                    .Where(x => x.Id == request.BillId && x.UserId == request.UserId)
                    .UpdateAsync(x => new BillDB
                    {
                        Title = request.NewTitle,
                    }, cancellationToken);

                if (updatedCount > 0)
                {
                    return new AbstractAnswer
                    {
                        Success = true,
                    };
                }
                
                return new AbstractAnswer
                {
                    Success = false,
                    Errors = new []{ "Bad request params" }
                };
            }
            catch (Exception e)
            {
                return new AbstractAnswer
                {
                    Success = false,
                    Errors = new []{ "Database error" },
                };
            }
        }
    }
}