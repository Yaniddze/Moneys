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
            options.CreateMap<UserDB, User>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Username,
                    map => map.MapFrom(
                        dest => dest.Username
                    ));
            
            options.CreateMap<User, UserDB>()
                .ForMember(x => x.Id,
                    map => map.MapFrom(
                        dest => dest.Id
                    ))
                .ForMember(x => x.Username,
                    map => map.MapFrom(
                        dest => dest.Username
                    ));
        }
    }
}