using System;
using Api.EventBus.Abstractions;

namespace Api.EventBus.Events.TransactionEvents
{
    public class UpdateTransactionEvent: IIntegrationEvent
    {
        public Guid TransactionId { get; set; }
        public Guid TypeId { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public double Value { get; set; }
    }
}