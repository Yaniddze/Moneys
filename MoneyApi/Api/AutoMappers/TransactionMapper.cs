using Api.AutoMappers.Abstractions;
using Api.DataBase.DbEntities;
using Api.Domain;
using AutoMapper;

namespace Api.AutoMappers
{
    public class TransactionMapper: IMapperInstaller
    {
        public void Install(IMapperConfigurationExpression options)
        {
            options.CreateMap<Transaction, TransactionDB>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Date,
                    map => map.MapFrom(
                        dest => dest.Info.Date
                    ))
                .ForMember(x => x.Description,
                    map => map.MapFrom(
                        dest => dest.Info.Description
                    ))
                .ForMember(x => x.Value,
                    map => map.MapFrom(
                        dest => dest.Info.Value
                    ))
                .ForMember(x => x.BillId,
                    map => map.MapFrom(
                        dest => dest.Bill.Id
                    ))
                .ForMember(x => x.TypeId,
                    map => map.MapFrom(
                        dest => dest.Type.Id
                    ));

            options.CreateMap<TransactionDB, Transaction>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Info,
                    map => map.MapFrom(
                        dest => new TransactionInfo
                        {
                            Date = dest.Date,
                            Description = dest.Description,
                            Value = dest.Value,
                        }
                    ))
                .ForMember(x => x.Bill,
                    map => map.MapFrom(
                        dest => dest.Bill
                    ))
                .ForMember(x => x.Type,
                    map => map.MapFrom(
                        dest => dest.Type
                    ));
        }
    }
}