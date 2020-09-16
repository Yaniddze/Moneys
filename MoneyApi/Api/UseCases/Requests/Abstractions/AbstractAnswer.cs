using System.Collections.Generic;

namespace Api.UseCases.Requests.Abstractions
{
    public class AbstractAnswer
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }

    public class AbstractAnswer<TData>
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public TData Data { get; set; }
    }
}