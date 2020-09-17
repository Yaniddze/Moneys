using System;
using Api.EventBus.Abstractions;

namespace Api.EventBus.Events.BillEvents
{
    public class BillUpdatedEvent: IIntegrationEvent
    {
        public Guid BillId { get; set; }
        public string NewTitle { get; set; }
    }
}