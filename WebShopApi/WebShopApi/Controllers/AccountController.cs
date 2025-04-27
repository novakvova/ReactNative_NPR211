using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebShopApi.Abstract;
using WebShopApi.Constants;
using WebShopApi.Data.Entities.Identity;
using WebShopApi.Models.Account;
using WebShopApi.Services;

namespace WebShopApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(UserManager<UserEntity> userManager,
    IJwtTokenService jwtTokenService,
    IImageService imageService,
    IMapper mapper) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginViewModel model)
    {
        try
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null) return BadRequest(new { error = "Дані вказано не вірно!" });

            if (!await userManager.CheckPasswordAsync(user, model.Password)) 
                return BadRequest(new { error = "Не вірно вказано дані!" });
            var token = await jwtTokenService.CreateTokenAsync(user);
            return Ok(new { token });
        }
        catch(Exception ex) 
        {
            return BadRequest(new { error = ex.Message});
        }
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterViewModel model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var user = await userManager.FindByEmailAsync(model.Email);
        if(user!=null)
        {
            return BadRequest(new { error = $"{model.Email} was registered."});
        }
        
        
        user = mapper.Map<UserEntity>(model);
        //var user = new UserEntity
        //{
        //    Email = model.Email,
        //    UserName = model.Email,
        //    Firstname = model.FirstName,
        //    Lastname = model.LastName
        //};

        if (model.Image != null)
        {
            var imageName = await imageService.SaveImageAsync(model.Image);
            user.Image = imageName;
        }

        var result = await userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);

        await userManager.AddToRoleAsync(user, Roles.User);

        var token = await jwtTokenService.CreateTokenAsync(user);

        return Ok(new { token });
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Profile()
    {
        try
        {
            //Thread.Sleep(2000);
            string userName = User.Claims.FirstOrDefault().Value;
            var user = await userManager.FindByNameAsync(userName);
            var model = mapper.Map<ProfileViewModel>(user);

            return Ok(model);
        }
        catch (Exception ex)
        {
            return NotFound(new
            {
                invalid = ex.Message
            });
        }
    }

}
