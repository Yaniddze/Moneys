using AutoMapper;

namespace Api.AutoMappers.Abstractions
{
    public interface IMapperInstaller
    {
        void Install(IMapperConfigurationExpression options);
    }
}