﻿using System.Threading.Tasks;

 namespace Api.EventBus.Abstractions
{
    public interface IIntegrationEventHandler<TEvent>
    {
        Task HandleAsync(TEvent @event);
    }
}