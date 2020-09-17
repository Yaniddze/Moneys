using System;
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
        private readonly MoneysContext _context;
        private readonly IMapper _mapper;

        public GetTransactionsCommandHandler(MoneysContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AbstractAnswer<IEnumerable<Transaction>>> Handle(GetTransactionsCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var founded = await _context.Transactions
                    .Where(x => x.Bill.UserId == request.UserId)
                        .Include(x => x.Type)
                    .Select(x => _mapper.Map<TransactionDB, Transaction>(x))
                    .ToListAsync(cancellationToken);

                return CreateSuccess(founded);
            }
            catch (Exception e)
            {
                return CreateFailed(new []{ "Database error" });
            }
        }
    }
}