using Api.UseCases.Abstractions;
using HotChocolate.Types;

namespace Api.GraphQL.Types.Abstractions
{
    public class AbstractAnswerType: ObjectType<AbstractAnswer>
    {
        protected override void Configure(IObjectTypeDescriptor<AbstractAnswer> descriptor)
        {
            descriptor.Field(x => x.Errors)
                .Type<ListType<StringType>>()
                .Name("errors");

            descriptor.Field(x => x.Success)
                .Type<BooleanType>()
                .Name("success");
        }
    }
    
    public class AbstractAnswerType<T,TOut>: ObjectType<AbstractAnswer<T>> where TOut : class, IOutputType
    {
        protected override void Configure(IObjectTypeDescriptor<AbstractAnswer<T>> descriptor)
        {
            descriptor.Field(x => x.Errors)
                .Type<ListType<StringType>>()
                .Name("errors");

            descriptor.Field(x => x.Success)
                .Type<BooleanType>()
                .Name("success");
            
            descriptor.Field(x => x.Data)
                .Type<TOut>()
                .Name("data");
        }
    }
}