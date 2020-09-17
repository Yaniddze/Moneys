using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.DataBase.DbEntities;
using Api.Domain;
using Api.UseCases.Abstractions;
using Api.UseCases.Commands;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static Api.UseCases.Abstractions.AbstractAnswer<System.Collections.Generic.IEnumerable<Api.Domain.TransactionType>>;

namespace Api.DataBase.CommandHandlers
{
    public class GetTransactionTypesCommandHandler: IRequestHandler<GetTransactionTypesCommand, AbstractAnswer<IEnumerable<TransactionType>>>
    {
        private readonly IMapper _mapper;
        private readonly MoneysContext _context;

        public GetTransactionTypesCommandHandler(MoneysContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AbstractAnswer<IEnumerable<TransactionType>>> Handle(GetTransactionTypesCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var founded = await _context.TransactionTypes
                    .Select(x => _mapper.Map<TransactionTypeDB, TransactionType>(x))
                    .ToListAsync(cancellationToken);
                
                return CreateSuccess(founded);
            }
            catch (Exception e)
            {
                return CreateFailed(new[] {"Database error"});
            }
        }
    }
}