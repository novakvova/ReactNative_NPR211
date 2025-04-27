using AutoMapper;
using WebShopApi.Data.Entities.Identity;
using WebShopApi.Models.Account;

namespace WebShopApi.Mapper;

public class AccountMapper : Profile
{
    public AccountMapper()
    {
        CreateMap<RegisterViewModel, UserEntity>()
            .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.Email));
    }
}
