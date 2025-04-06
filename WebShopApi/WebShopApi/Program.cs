using Microsoft.AspNetCore.Identity;
using System;
using Microsoft.EntityFrameworkCore;
using WebShopApi.Data;
using WebShopApi.Data.Entities.Identity;
using Microsoft.Extensions.FileProviders;
using WebShopApi.Abstract;
using WebShopApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<WebShopDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("WebShopApiConnection")));


builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 5;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
}).AddEntityFrameworkStores<WebShopDbContext>().AddDefaultTokenProviders();

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
//builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    //app.MapOpenApi();
//}

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web Shop v1"));

string imagesDirPath = Path.Combine(Directory.GetCurrentDirectory(), builder.Configuration["ImagesDir"]);

Directory.CreateDirectory(imagesDirPath);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(imagesDirPath),
    RequestPath = "/images"
});

app.UseAuthorization();

app.MapControllers();

await app.SeedAsync();

app.Run();
