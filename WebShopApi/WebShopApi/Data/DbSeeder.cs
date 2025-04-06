using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebShopApi.Constants;
using WebShopApi.Data.Entities.Identity;

namespace WebShopApi.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(this WebApplication wa)
        {
            using var scope = wa.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<WebShopDbContext>();

            context.Database.Migrate();

            if (!context.Roles.Any())
            {
                var rm = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
                await rm.CreateAsync(new RoleEntity { Name = Roles.Admin });
                await rm.CreateAsync(new RoleEntity { Name = Roles.User });
            }

            if (!context.Users.Any())
            {
                
            }
        }
    }
}
