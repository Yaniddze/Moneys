using System.Collections.Generic;

namespace Api.UseCases.Abstractions
{
    public class AbstractAnswer
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }

        public static AbstractAnswer CreateSuccess() => new AbstractAnswer
        {
            Success = true,
        };
        
        public static AbstractAnswer CreateFailed(IEnumerable<string> errors) => new AbstractAnswer
        {
            Success = false,
            Errors = errors,
        };
    }

    public class AbstractAnswer<TData>
    {
        public bool Success { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public TData Data { get; set; }
        
        public static AbstractAnswer<TData> CreateSuccess(TData data) => new AbstractAnswer<TData>
        {
            Success = true,
            Data = data,
        };
        
        public static AbstractAnswer<TData> CreateFailed(IEnumerable<string> errors) => new AbstractAnswer<TData>
        {
            Success = false,
            Errors = errors,
        };
    }
}