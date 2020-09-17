using System;
using Api.EventBus.Abstractions;

namespace Api.EventBus.Events.TransactionEvents
{
    public class NewTransactionEvent: IIntegrationEvent
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }
        public Guid BillId { get; set; }
        public DateTime Date { get; set; }
    }
}