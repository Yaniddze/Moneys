using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using MediatR;
using Z.EntityFramework.Plus;

namespace Api.DataBase.CommandHandlers
{
    public class RemoveBillCommandHandler: IRequestHandler<RemoveBillCommand, AbstractAnswer>
    {
        private readonly MoneysContext _context;

        public RemoveBillCommandHandler(MoneysContext context)
        {
            _context = context;
        }

        public async Task<AbstractAnswer> Handle(RemoveBillCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var deletedCount = await _context.Bills
                    .Where(x => x.Id == request.BillId && x.UserId == request.UserId)
                    .DeleteAsync(cancellationToken);

                if (deletedCount > 0)
                {
                    return new AbstractAnswer
                    {
                        Success = true
                    };
                }
                
                return new AbstractAnswer
                {
                    Success = false,
                    Errors = new []{ "Bad user_id or bill_id" }
                };
            }
            catch (Exception e)
            {
                return new AbstractAnswer
                {
                    Success = false,
                    Errors = new []{ "Database error" }
                };
            }
        }
    }
}
