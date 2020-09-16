using System;
using System.Collections.Generic;
using Api.Domain.Abstractions;

namespace Api.Domain
{
    public class TransactionInfo: ValueObject
    {
        public string Description { get; set; }
        public double Value { get; set; }
        public DateTime Date { get; set; }
        
        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Description;
            yield return Value;
            yield return Date;
        }
    }
}