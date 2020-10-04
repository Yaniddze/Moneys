using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.BillsCommands;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Collections.Generic.IEnumerable<Api.Domain.Bill>>;

namespace Api.DataBase.CommandHandlers.Bills
{
    public class GetBillsCommandHandler: IRequestHandler<GetBillsCommand, AbstractAnswer<IEnumerable<Bill>>>
    {
        private readonly MoneysContext context;
        private readonly IMapper mapper;

        public GetBillsCommandHandler(IMapper mapper, MoneysContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        public async Task<AbstractAnswer<IEnumerable<Bill>>> Handle(GetBillsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var founded = await context.Bills
                    .Where(x => x.UserId == request.UserId)
                        .Include(x => x.User)
                    .Select(x => mapper.Map<BillDB, Bill>(x))
                    .ToListAsync(cancellationToken);
                
                return CreateSuccess(founded);
            }
            catch
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}