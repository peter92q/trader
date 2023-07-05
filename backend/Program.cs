using System.Text;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

//-----Config swagger to send JWT tokens for authorization-----//
builder.Services.AddSwaggerGen(c=>{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
      BearerFormat = "JWT",
      Name = "Authorization",
      In = ParameterLocation.Header,
      Type = SecuritySchemeType.ApiKey,
      Scheme = JwtBearerDefaults.AuthenticationScheme,
      Description = "Put Bearer + your token in the box below",
      Reference = new OpenApiReference
      {
        Id = JwtBearerDefaults.AuthenticationScheme,
        Type = ReferenceType.SecurityScheme
      }
    };

    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            jwtSecurityScheme, Array.Empty<string>()
        }
    });
});
//--SQLITE/POSTGRES SERVICE--//
builder.Services.AddDbContext<MyDbContext>(opt=>{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//--CORS--//
builder.Services.AddCors();
//--Identity Core--//
builder.Services.AddIdentityCore<User>(opt=>{
    opt.User.RequireUniqueEmail = true;  
})
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<MyDbContext>();
//------------------JWT AUTHENTICATION--------------------//
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>{
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                                    .GetBytes(builder.Configuration["JWTSettings:TokenKey"]))
        };
    });

builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();
builder.Services.AddScoped<TokenService>();
builder.Services.AddHttpClient();
builder.Services.AddScoped<CoingeckoService>();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c=>
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
    });
}
app.UseCors(opt => 
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("hidden");
});

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<MyDbContext>();
var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try{
    await context.Database.MigrateAsync();
    await SampleData.Initialize(context, userManager);
}catch(Exception ex)
{
    logger.LogError(ex, "A problem occurred during migration");
}

app.Run();
