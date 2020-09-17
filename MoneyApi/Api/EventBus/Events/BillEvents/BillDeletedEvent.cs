using System;
using Api.EventBus.Abstractions;

namespace Api.EventBus.Events.BillEvents
{
    public class BillDeletedEvent: IIntegrationEvent
    {
        public Guid BillId { get; set; }
    }
}