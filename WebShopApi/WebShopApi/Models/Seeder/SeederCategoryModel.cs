namespace WebShopApi.Models.Seeder;

public class SeederCategoryModel
{
    public string Name { get; set; } = string.Empty;
    public string? Image { get; set; }
    public string? Description { get; set; }
    public long UserId { get; set; }
}
