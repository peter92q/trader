using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class MyDbContext : IdentityDbContext<User>
{
    public MyDbContext(DbContextOptions options) : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<IdentityRole>()
            .HasData
            (
                new IdentityRole{Name = "Member", NormalizedName = "MEMBER"},
                new IdentityRole{Name = "Admin", NormalizedName = "ADMIN"}
            );
    }
}