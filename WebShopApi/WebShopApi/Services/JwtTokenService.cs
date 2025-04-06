using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebShopApi.Abstract;
using WebShopApi.Data.Entities.Identity;

namespace WebShopApi.Services
{
    public class JwtTokenService(IConfiguration configuration,
       UserManager<UserEntity> userManager) : IJwtTokenService
    {
        public async Task<string> CreateTokenAsync(UserEntity user)
        {
            var claims = new List<Claim>
            {
                new Claim("email", user.Email),
                new Claim("name", $"{user.Lastname} {user.Firstname}")
            };
            var roles = await userManager.GetRolesAsync(user);

            foreach (var role in roles)
                claims.Add(new Claim("roles", role));

            var key = Encoding.UTF8.GetBytes(configuration.GetValue<string>("JwtSecretKey") ??
                "adlfjalUIYUuihafy3498rt74k765gy32lNLJLhfasify93shfRQR##%^#&&^%@#$!sljdfl33");

            var signinKey = new SymmetricSecurityKey(key);

            var signinCredential = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(
                signingCredentials: signinCredential,
                expires: DateTime.Now.AddDays(10),
                claims: claims);

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
