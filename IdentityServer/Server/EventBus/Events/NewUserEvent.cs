using Server.EventBus.Abstractions;

namespace Server.EventBus.Events
{
    public class NewUserEvent: IIntegrationEvent
    {
        public string Id { get; set; }
        public string Username { get; set; }
    }
}