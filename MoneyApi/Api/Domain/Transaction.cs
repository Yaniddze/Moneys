using Api.Domain.Abstractions;

namespace Api.Domain
{
    public class Transaction: Entity
    {
        public Bill Bill { get; set; }
        public TransactionInfo Info { get; set; }
        public TransactionType Type { get; set; }
    }
}