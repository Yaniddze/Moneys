using System;
using Api.EventBus.Abstractions;

namespace Api.EventBus.Events.TransactionEvents
{
    public class RemoveTransactionEvent: IIntegrationEvent
    {
        public Guid TransactionId { get; set; }
    }
}