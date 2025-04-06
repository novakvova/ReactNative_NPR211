using WebShopApi.Data.Entities.Identity;

namespace WebShopApi.Abstract;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}
