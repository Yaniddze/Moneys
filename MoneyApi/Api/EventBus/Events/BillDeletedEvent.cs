using System;
using Api.EventBus.Abstractions;

namespace Api.EventBus.Events
{
    public class BillDeletedEvent: IIntegrationEvent
    {
        public Guid BillId { get; set; }
    }
}