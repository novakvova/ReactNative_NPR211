using AutoMapper;
using WebShopApi.Data.Entities;
using WebShopApi.Models.Category;

namespace WebShopApi.Mapper;

public class CategoryMapper : Profile
{
    public CategoryMapper()
    {
        CreateMap<CategoryEntity, CategoryItemViewModel>();

        CreateMap<CategoryCreateViewModel, CategoryEntity>()
            .ForMember(opt => opt.Image, x => x.Ignore());

        CreateMap<CategoryEditViewModel, CategoryEntity>()
            .ForMember(opt => opt.Image, x => x.Ignore());
    }
}
