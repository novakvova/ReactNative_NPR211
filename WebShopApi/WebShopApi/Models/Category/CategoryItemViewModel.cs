namespace WebShopApi.Models.Category;

public class CategoryItemViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; }
    public string? Description { get; set; }
    public long UserId { get; set; }
}
