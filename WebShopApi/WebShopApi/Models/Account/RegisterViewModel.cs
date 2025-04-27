namespace WebShopApi.Models.Account;

public class RegisterViewModel
{
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public string? FirstName { get; set; } = string.Empty;

    public string? LastName { get; set; } = string.Empty;

    public IFormFile? Image { get; set; }
}
