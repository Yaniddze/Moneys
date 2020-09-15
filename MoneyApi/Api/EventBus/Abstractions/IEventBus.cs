﻿ namespace Api.EventBus.Abstractions
{
    public interface IEventBus
    {
        void Publish(IIntegrationEvent @event, string exchangeName);

        void Subscribe<TEvent, THandler>(string exchangeName, string subscriberName)
            where TEvent : IIntegrationEvent
            where THandler : IIntegrationEventHandler<TEvent>;
    }
}