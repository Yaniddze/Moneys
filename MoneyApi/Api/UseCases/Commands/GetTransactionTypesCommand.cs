using System.Collections.Generic;
using Api.Domain;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Commands
{
    public class GetTransactionTypesCommand: IRequest<AbstractAnswer<IEnumerable<TransactionType>>>
    { }
}