﻿using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.Requests
{
    public class CreateBillRequest: IRequest<AbstractAnswer<Guid>>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
    }
}