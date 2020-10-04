using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands.TransactionCommands;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Collections.Generic.IEnumerable<Api.Domain.Transaction>>;

namespace Api.DataBase.CommandHandlers.Transactions
{
    public class GetTransactionsCommandHandler: IRequestHandler<GetTransactionsCommand, AbstractAnswer<IEnumerable<Transaction>>>
    {
        private readonly MoneysContext context;
        private readonly IMapper mapper;

        public GetTransactionsCommandHandler(MoneysContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<AbstractAnswer<IEnumerable<Transaction>>> Handle(GetTransactionsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var founded = await context.Transactions
                    .Where(x => x.Bill.UserId == request.UserId)
                        .Include(x => x.Type)
                    .Select(x => mapper.Map<TransactionDB, Transaction>(x))
                    .ToListAsync(cancellationToken);

                return CreateSuccess(founded);
            }
            catch
            {
                return CreateFailed(new []{ "Database error" });
            }
        }
    }
}