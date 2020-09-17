using Api.AutoMappers.Abstractions;
using Api.DataBase.DbEntities;
using Api.Domain;
using AutoMapper;

namespace Api.AutoMappers
{
    public class TransactionTypeMapper: IMapperInstaller
    {
        public void Install(IMapperConfigurationExpression options)
        {
            options.CreateMap<TransactionType, TransactionTypeDB>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Title,
                    map => map.MapFrom(
                        dest => dest.Title
                    ));
            
            options.CreateMap<TransactionTypeDB, TransactionType>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Title,
                    map => map.MapFrom(
                        dest => dest.Title
                    ));
        }
    }
}