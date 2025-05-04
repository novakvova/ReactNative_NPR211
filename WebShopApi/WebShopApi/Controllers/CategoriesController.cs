using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebShopApi.Data;
using WebShopApi.Data.Entities.Identity;
using WebShopApi.Models.Category;

namespace WebShopApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
[Authorize]
public class CategoriesController(WebShopDbContext context,
    UserManager<UserEntity> userManager,
    IMapper mapper) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetList()
    {
        try
        {
            string userName = User.Claims.FirstOrDefault().Value;
            var user = await userManager.FindByEmailAsync(userName);
            var list = context.Categories
                .Where(x => x.UserId == user.Id)
                .ProjectTo<CategoryItemViewModel>(mapper.ConfigurationProvider)
                .ToList();
            return Ok(list);
        }
        catch(Exception ex) 
        {
            return BadRequest(new { error = ex.Message});
        }
    }
}
