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
        private readonly IMapper mapper;
        private readonly MoneysContext context;

        public GetTransactionTypesCommandHandler(MoneysContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<AbstractAnswer<IEnumerable<TransactionType>>> Handle(GetTransactionTypesCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var founded = await context.TransactionTypes
                    .Select(x => mapper.Map<TransactionTypeDB, TransactionType>(x))
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