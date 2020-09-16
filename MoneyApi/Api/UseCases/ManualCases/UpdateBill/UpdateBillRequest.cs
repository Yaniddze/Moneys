﻿using System;
using Api.UseCases.Abstractions;
using MediatR;

namespace Api.UseCases.ManualCases.UpdateBill
{
    public class UpdateBillRequest: IRequest<AbstractAnswer>
    {
        public Guid UserId { get; set; }
        public Guid BillId { get; set; }
        public string NewTitle { get; set; }
    }
}