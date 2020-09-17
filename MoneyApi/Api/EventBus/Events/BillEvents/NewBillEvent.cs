using System;
using Api.EventBus.Abstractions;

namespace Api.EventBus.Events.BillEvents
{
    public class NewBillEvent: IIntegrationEvent
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}