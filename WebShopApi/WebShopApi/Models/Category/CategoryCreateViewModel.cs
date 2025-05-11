namespace WebShopApi.Models.Category;

public class CategoryCreateViewModel
{
    public string Name { get; set; } = string.Empty;
    public IFormFile Image { get; set; }
    public string? Description { get; set; }
}
