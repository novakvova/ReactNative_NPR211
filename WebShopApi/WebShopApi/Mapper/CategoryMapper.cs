using AutoMapper;
using WebShopApi.Data.Entities;
using WebShopApi.Models.Category;

namespace WebShopApi.Mapper;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryItemViewModel>();
    }
}
