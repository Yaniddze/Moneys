using Api.AutoMappers.Abstractions;
using Api.DataBase.DbEntities;
using Api.Domain;
using AutoMapper;

namespace Api.AutoMappers
{
    public class UserMapper: IMapperInstaller
    {
        public void Install(IMapperConfigurationExpression options)
        {
            options.CreateMap<Bill, BillDB>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id    
                    ))
                .ForMember(x => x.Title,
                    map => map.MapFrom(
                        dest => dest.Title    
                    ))
                .ForMember(x => x.User,
                    map => map.MapFrom(
                        dest => dest.Owner    
                    ))
                .ForMember(x => x.UserId,
                    map => map.MapFrom(
                        dest => dest.Owner.Id    
                    ));
            
            options.CreateMap<BillDB, Bill>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id    
                    ))
                .ForMember(x => x.Title,
                    map => map.MapFrom(
                        dest => dest.Title    
                    ))
                .ForMember(x => x.Owner,
                    map => map.MapFrom(
                        dest => dest.User    
                    ));
        }
    }
}