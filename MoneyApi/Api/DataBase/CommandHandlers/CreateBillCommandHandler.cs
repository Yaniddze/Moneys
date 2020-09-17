using System;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using MediatR;

namespace Api.DataBase.CommandHandlers
{
    public class CreateBillCommandHandler: IRequestHandler<CreateBillCommand, AbstractAnswer<Guid>>
    {
        private readonly MoneysContext _context;

        public CreateBillCommandHandler(MoneysContext context)
        {
            _context = context;
        }

        public async Task<AbstractAnswer<Guid>> Handle(CreateBillCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var tempId = Guid.NewGuid();

                _context.Bills.Add(new BillDB
                {
                    Id = tempId,
                    Title = request.Title,
                    UserId = request.UserId,
                });

                await _context.SaveChangesAsync(cancellationToken);
                
                return new AbstractAnswer<Guid>
                {
                    Success = true,
                    Data = tempId,
                };
            }
            catch (Exception ex)
            {
                return new AbstractAnswer<Guid>
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
        }
    }
}