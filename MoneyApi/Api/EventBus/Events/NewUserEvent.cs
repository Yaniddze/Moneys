﻿using Api.EventBus.Abstractions;

 namespace Api.EventBus.Events
{
    public class NewUserEvent: IIntegrationEvent
    {
        public string Id { get; set; }
        public string Username { get; set; }
    }
}